import React, { useState } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';

const EditorPage = () => {
	const [clients, setClients] = useState([
		{ socketId: 1, username: 'sourav ' },
		{ socketId: 2, username: 'random p' },
		{ socketId: 3, username: 'ranson' },
		{ socketId: 4, username: 'rson' },
	]);

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
								userName={client.username}
							/>
						))}
					</div>
				</div>
				<button className='btn copyBtn'>Copy Room ID</button>
				<button className='btn leaveBtn'>Leave</button>
			</div>
			<div className='editorWrap'>
				<Editor />
			</div>
		</div>
	);
};

export default EditorPage;
