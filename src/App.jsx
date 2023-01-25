import React from 'react';
import ky from 'ky';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
	const [users, setUsers] = React.useState([]);
	const [invites, setInvites] = React.useState([]);
	const [isLoading, setLoading] = React.useState(true);
	const [searchValue, setSearchValue] = React.useState('');
	const [success, setSuccess] = React.useState(false);

	const onChangeSearchValue = (event) => {
		setSearchValue(event.target.value);
	};

	const onClickInvite = (id) => {
		if (invites.includes(id)) {
			setInvites((prev) => prev.filter((_id) => _id !== id));
		} else {
			setInvites((prev) => [...prev, id]);
		}
	};

	const onClickSendInvites = () => {
		setSuccess(true);
	};
	React.useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await ky.get('https://reqres.in/api/users').json();
				setUsers(response.data);
			} catch (err) {
				console.warn(err);
			} finally {
				setLoading(false);
			}
		};
		getUsers();
	}, []);

	return (
		<div className='App'>
			{success ? (
				<Success />
			) : (
				<Users
					searchValue={searchValue}
					onChangeSearchValue={onChangeSearchValue}
					items={users}
					isLoading={isLoading}
					invites={invites}
					onClickInvite={onClickInvite}
					onClickSendInvites={onClickSendInvites}
				/>
			)}
		</div>
	);
}

export default App;
