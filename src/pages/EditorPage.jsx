import React, { useState, useRef, useEffect } from 'react';
import ACTIONS from '../Actions';
import Client from '../components/Client';
import toast from 'react-hot-toast';

import Editor from '../components/Editor';
import { initSocket } from '../socket';
import {
	useLocation,
	Navigate,
	useNavigate,
	useParams,
} from 'react-router-dom';

const EditorPage = () => {
	const [clients, setClients] = useState([]);
	const codeRef = useRef(null);
	const socketRef = useRef(null);
	const reactNavigator = useNavigate();
	const { roomId } = useParams();
	const location = useLocation();
	useEffect(() => {
		const init = async () => {
			socketRef.current = await initSocket();
			socketRef.current.on('connect_error', (err) => handleErrors(err));
			socketRef.current.on('connect_failed', (err) => handleErrors(err));

			function handleErrors(e) {
				console.log('socket error', e);
				toast.error('Socket connection failed, try again later.');
				reactNavigator('/');
			}
			socketRef.current.emit(ACTIONS.JOIN, {
				roomId,
				userName: location.state?.userName,
			});

			socketRef.current.on(
				ACTIONS.JOINED,
				({ clients, userName, socketId }) => {
					if (userName !== location.state?.userName) {
						toast.success(`${userName} joined the room`);
					}
					setClients(clients);
					socketRef.current.emit(ACTIONS.SYNC_CODE, {
						code: codeRef.current,
						socketId,
					});
				}
			);

			socketRef.current.on(
				ACTIONS.DISCONNECTED,
				({ socketId, userName }) => {
					toast.success(`${userName} left the room`);
					setClients((prev) => {
						return prev.filter(
							(client) => client.socketId !== socketId
						);
					});
				}
			);
		};
		init();

		return () => {
			socketRef.current.disconnet();
			socketRef.current.off(ACTIONS.JOINED);
			socketRef.current.off(ACTIONS.DISCONNECTED);
		};
	}, []);

	if (!location.state) {
		return <Navigate to='/' />;
	}

	async function copyRoomId() {
		try {
			await navigator.clipboard.writeText(roomId);
			toast.success('Room Id is copied to your clipboard');
		} catch (err) {
			toast.error('Could not copy the room Id');
		}
	}

	function leaveRoom() {
		reactNavigator('/');
	}

	return (
		<div className='mainWrap'>
			<div className='aside'>
				<div className='asideInner'>
					<div className='logo'>
						<img
							className='logoImg'
							src='/synccode.png'
							alt='logo'
							width='200'
							height='100'
						/>
					</div>
					<h3>Connected</h3>
					<div className='clientsList'>
						{clients.map((client) => (
							<Client
								key={client.socketId}
								userName={client.userName}
							/>
						))}
					</div>
				</div>
				<button className='btn copyBtn' onClick={copyRoomId}>
					Copy Room ID
				</button>
				<button className='btn leaveBtn' onClick={leaveRoom}>
					Leave
				</button>
			</div>
			<div className='editorWrap'>
				<Editor
					socketRef={socketRef}
					roomId={roomId}
					onCodeChange={(code) => {
						codeRef.current = code;
					}}
				/>
			</div>
		</div>
	);
};

export default EditorPage;
