import { useEffect, useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';

function App() {
	const [message, setMessage] = useState('');

	useEffect(() => {
		fetch('/api/hello')
			.then(res => res.json())
			.then(data => {
				setMessage(data.message);
			});
	}, []);

	return (
		<div className='p-4 flex flex-col gap-4'>
			<span className='font-bold text-4xl text-cyan-600'>{message}</span>
			<Button className='max-w-fit'>Click me</Button>
		</div>
	);
}

export default App;
