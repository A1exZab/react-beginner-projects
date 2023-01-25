import React from 'react';

export const Success = () => {
	return (
		<div className='success-block'>
			<img src='/assets/success.svg' alt='Success' />
			<h3>Успешно!</h3>
			<p>Выбранным пользователям отправлено приглашение.</p>
			<button onClick={() => window.location.reload()} className='send-invite-btn'>
				Назад
			</button>
		</div>
	);
};
