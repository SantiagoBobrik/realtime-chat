const socket = io();

const send = document.querySelector(".send");
const user = document.querySelector(".user-input ");
const message = document.querySelector(".msg-input ");
const msgcontainer = document.querySelector(".msg-container");

send.addEventListener("click", () => {
	let data = { msg: message.value, user: user.value };
	socket.emit("chat:msg", data);
});

let pepe = `<div class="col-12 d-flex justify-content-end">
<p class="other">bien y vos?</p>
</div>;`;

socket.on("chat:msg", (data) => {
	let msgType = "";
	let flex = "";
	if (data.user != user.value) {
		msgType = "other";
		flex = "end";
	} else {
		msgType = "you";
		flex = "start";
	}
	msgcontainer.innerHTML += ` <div class="col-12 d-flex justify-content-${flex}">
    <p class="${msgType}"><strong>${data.user}:</strong> <br>${data.msg}</p>
</div>`;
});
