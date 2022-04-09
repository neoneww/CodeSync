import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();
	const [roomId, setRoomId] = useState('');
	const [userName, setUserName] = useState('');

	const createNewRoom = (e) => {
		e.preventDefault();
		const id = uuidV4();
		setRoomId(id);
		toast.success('Created New Room');
	};

	const joinRoom = () => {
		if (!roomId && !userName) {
			toast.error('ROOM ID and User Name are both required');
		} else if (!roomId) {
			toast.error('ROOM ID is required');
		} else if (!userName) {
			toast.error('User Name is required');
		}

		navigate(`/editor/${roomId}`, {
			state: {
				userName,
			},
		});
	};

	return (
		<div className='homePageWrapper'>
			<div className='formWrapper'>
				<img className='homePageLogo' src='./synccode.png' alt='logo' />
				<h4 className='mainLabel'>Paste Invitation ROOM ID</h4>
				<div className='InputGroup'>
					<input
						type='text'
						className='InputBox'
						placeholder='ROOM ID'
						onChange={(e) => setRoomId(e.target.value)}
						value={roomId}
					/>
					<input
						type='text'
						className='InputBox'
						placeholder='USER NAME'
						onChange={(e) => setUserName(e.target.value)}
						value={userName}
					/>
					<button className='btn joinBtn' onClick={joinRoom}>
						JOIN
					</button>
					<span className='createInfo'>
						If you don't have an invite then create a &nbsp;
						<a
							onClick={createNewRoom}
							href='/'
							className='createNewBtn'
						>
							NEW ROOM
						</a>
					</span>
				</div>
			</div>
			<footer>
				<h4>
					Built with 🧡 by{' '}
					<a href='https://github.com/neoneww'> Sourav Sharma </a>
				</h4>
			</footer>
		</div>
	);
};

export default Home;
