import React from 'react';

function Error() {
	return (
		<div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column' }}>
			<h1 style={{ color: 'red', textAlign: 'center' }}>Error: 404</h1>
			<p style={{ flexGrow: '1', textAlign: 'center' }}>해당 페이지는 존재하지 않습니다.</p>
		</div>
	);
}

export default Error;
