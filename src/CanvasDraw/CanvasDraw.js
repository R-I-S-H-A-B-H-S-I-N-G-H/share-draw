import React, { useEffect, useRef } from "react";
import { connect, io } from "socket.io-client";
import config from "../../config/config";
import { useParams } from "react-router-dom";

const socket = io.connect(config.socketEndpoint);

export default function CanvasDraw() {
	const { id: roomId } = useParams();

	const canvasRef = useRef();
	const canvasUtilRef = useRef();

	useEffect(() => {
		connectToRoom(roomId);
		setupSocketListeners();
		initCanvasListeners();
	}, []);

	function connectToRoom(roomId) {
		socket.emit("join-room", roomId);
	}

	function setupSocketListeners() {
		socket.on("receieve_message", updateCanvas);
	}

	function initCanvasListeners() {
		if (!canvasRef.current) return;
		canvasUtilRef.current = CanvasUtil.init(canvasRef.current, 400, 400);
		canvasUtilRef.current.background(200, 100);

		canvasUtilRef.current.onChange(onCanvasChangeHandler);
		canvasUtilRef.current.onMouseMove(onMouseMoveHandler);
	}

	function onMouseMoveHandler(mouseEvent) {
		const { px, py, x, y, up } = mouseEvent;
		if (up) return;
		if (!canvasUtilRef.current) return;

		canvasUtilRef.current.fill();
		canvasUtilRef.current.stroke();
		canvasUtilRef.current.circle(x, y, 10);
	}

	function onCanvasChangeHandler(change) {
		const { other } = change;
		if (other) return;
		sendMessage(change, roomId);
	}

	function updateCanvas(data) {
		const { command, other } = data;
		canvasUtilRef.current.exec(command);
	}

	function sendMessage(data, room = "") {
		socket.emit("send_message", data, room);
	}

	return <canvas ref={canvasRef}></canvas>;
}
