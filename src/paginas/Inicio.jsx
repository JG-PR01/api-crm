import { useState, useEffect } from 'react';
import Cliente from '../components/Cliente';

const Inicio = () => {
	const [clientes, setClientes] = useState([]);

	useEffect(() => {
		const obtenerCliente = async () => {
			try {
				const url = 'http://localhost:4000/clientes';

				const respuesta = await fetch(url);

				const resultado = await respuesta.json();

				setClientes(resultado);
			} catch (error) {
				console.log(error);
			}
		};

		obtenerCliente();
	}, []);

	const handleEliminar = async (id) => {
		const confirmar = confirm('Desea eliminar este cliente?');

		if (confirmar) {
			try {
				// Eliminando un registro
				const url = `http://localhost:4000/clientes/${id}`;

				const respuesta = await fetch(url, {
					method: 'DELETE',
				});

				await respuesta.json();
			} catch (error) {
				console.log(error);
			}

			const arrayClientes = clientes.filter((cliente) => cliente.id !== id);

			setClientes(arrayClientes);

			return;
		}
		console.log('Eliminando...', id);
	};

	return (
		<>
			<h1 className="font-black text-4xl text-blue-900 ">Clientes</h1>
			<p className="mt-3">Administra tus clientes</p>

			<table className="w-full mt-5 table-auto shadow bg-white">
				<thead className="bg-blue-800 text-white">
					<tr>
						<th>Nombre</th>
						<th>Contacto</th>
						<th>Empresa</th>
						<th>Acciones</th>
					</tr>
				</thead>

				<tbody>
					{clientes.map((cliente) => (
						<Cliente
							key={cliente.id}
							cliente={cliente}
							handleEliminar={handleEliminar}
						/>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Inicio;
