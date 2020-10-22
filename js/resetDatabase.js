function resetMemory()
{
	const request = new XMLHttpRequest();
	request.open("PUT", "https://json.extendsclass.com/bin/60ca0abe3b8e", true);
	request.setRequestHeader("Content-type", "application/json");
	request.setRequestHeader("Security-key", "Your security key");
	request.onreadystatechange = () => {
	};
	request.send('[{"99":"99"}]');
}

function resetReflectie()
{
	const request = new XMLHttpRequest();
	request.open("PUT", "https://json.extendsclass.com/bin/676b8306466d", true);
	request.setRequestHeader("Content-type", "application/json");
	request.setRequestHeader("Security-key", "Your security key");
	request.onreadystatechange = () => {
	};
	request.send('[{"99":"99"}]');
}

function resetReactie()
{
	const request = new XMLHttpRequest();
	request.open("PUT", "https://json.extendsclass.com/bin/b270de2e37a3", true);
	request.setRequestHeader("Content-type", "application/json");
	request.setRequestHeader("Security-key", "Your security key");
	request.onreadystatechange = () => {
	};
	request.send('[{"99":"99"}]');
}