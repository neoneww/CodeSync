import React from 'react';

const Home = () => {
	return (
		<div className='homePageWrapper'>
			<div className='formWrapper'>
				<img
					className='homePageLogo'
					src='./synccode.png'
					alt='logo'
					
				/>
				<h4 className='mainLabel'>Paste Invitation ROOM ID</h4>
				<div className='InputGroup'>
					<input
						type='text'
						className='InputBox'
						placeholder='ROOM ID'
					/>
					<input
						type='text'
						className='InputBox'
						placeholder='USER NAME'
					/>
					<button className='btn joinBtn'>JOIN</button>
					<span className='createInfo'>
						If you don't have an invite then create a &nbsp;
						<a href='' className='createNewBtn'>
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
