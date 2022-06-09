import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const VerCliente = () => {
	const [cliente, setCliente] = useState({});
	const [cargando, setCargando] = useState(true);

	const { nombre, empresa, telefono, email, notas } = cliente;

	const { id } = useParams();

	useEffect(() => {
		const obtenerClienteAPI = async () => {
			try {
				const url = `${import.meta.env.VITE_API_URL}/${id}`;

				const respuesta = await fetch(url);

				const resultado = await respuesta.json();

				setCliente(resultado);
			} catch (error) {
				console.log(error);
			}

			setCargando(!cargando);
		};

		obtenerClienteAPI();
	}, []);

	return cargando ? (
		<Spinner />
	) : Object.keys(cliente).length === 0 ? (
		<h2 className="font-black text-4xl ">No hay resultados</h2>
	) : (
		<>
			<h1 className="font-black text-4xl text-blue-900 ">
				Ver Cliente: {nombre}
			</h1>
			<p className="mt-3">Información del cliente</p>

			{nombre && (
				<p className="text-gray-600 text-4xl mt-10">
					<span className=" text-gray-800 font-bold uppercase">Cliente:</span>{' '}
					{nombre}
				</p>
			)}
			{empresa && (
				<p className="text-gray-600 text-2xl mt-4">
					<span className=" text-gray-800 font-bold uppercase">Empresa:</span>{' '}
					{empresa}
				</p>
			)}
			{telefono && (
				<p className="text-gray-600 text-2xl mt-4">
					<span className=" text-gray-800 font-bold uppercase">Teléfono:</span>{' '}
					{telefono}
				</p>
			)}
			{email && (
				<p className="text-gray-600 text-2xl mt-4">
					<span className=" text-gray-800 font-bold uppercase">E-mail:</span>{' '}
					{email}
				</p>
			)}
			{notas && (
				<p className="text-gray-600 text-2xl mt-4">
					<span className=" text-gray-800 font-bold uppercase">Notas:</span>{' '}
					{notas}
				</p>
			)}
		</>
	);
};

export default VerCliente;
