async function signIn() {
    // console.log('works')}
	const email = document.getElementById('email').value;
	const password1 = document.getElementById('password1').value;
	const password2 = document.getElementById('password2').value;

	// Valido los campos
	if (email.length === 0 || password1.length === 0 || password2.length === 0) {
		alert('Algunos campos están vacíos');
		return;
	} else if (password1 !== password2) {
		alert('Los Password son diferentes');
		return;
	}

	// Send data.
    //defino el body
	const body = JSON.stringify({
		email,
		password: password2,
	});
	const result = await fetch('http://localhost:4500/api/user/sign-up', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	});
    const user = await result.json();
}
