import { createUniversalRouterObserver } from '@src/utils/spaNavigator';
import { Link } from 'lucide-react';
import { useEffect, useState } from 'react';

export const BetterNavBar = () => {
	const [inputValue, setInputValue] = useState(location.href);

	useEffect(() => {
		createUniversalRouterObserver(url => {
			setInputValue(url);
		});
	}, []);

	const handleClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') return;

		let value = (event.target as HTMLInputElement).value.trim();

		if (!value) return;

		if (value.startsWith('/')) {
			value = window.location.origin + value;
		}

		history.pushState({}, '', value);

		window.dispatchEvent(new PopStateEvent('popstate'));
	};

	return (
		<div className='fixed top-0 left-0 w-full z-999999 h-10'>
			<div
				className='flex items-center gap-4 p-3 py-2 shadow'
				style={{
					background: 'repeating-linear-gradient(135deg,#f7f3ff   0,#f7f3ff   20px,#efe7ff   20px,#efe7ff   40px)',
				}}
			>
				<Link height={16} width={16} />
				<input
					className='flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-800 font-[inter]'
					style={{
						textShadow: '0 1px 2px rgba(255,255,255,0.4)',
					}}
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					onKeyDown={handleClick}
				/>
			</div>
		</div>
	);
};
