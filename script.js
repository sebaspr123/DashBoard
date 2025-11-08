let arreglo_personas = [];

function inicializarDatos() {
    const datosGuardados = localStorage.getItem("list");
    if (datosGuardados) {
        arreglo_personas = JSON.parse(datosGuardados);
    } else {
        arreglo_personas = [];
    }
    actualizarTabla();
}

document.getElementById('sidebar-toggle').addEventListener('click', function () {
    document.querySelector('.w-64').classList.toggle('hidden');
    document.querySelector('.w-64').classList.toggle('absolute');
    document.querySelector('.w-64').classList.toggle('z-50');
});

function mostrarDashboard(event) {
    event.preventDefault();
    document.getElementById('dashboard-section').style.display = 'block';
    document.getElementById('formulario-section').style.display = 'none';
    document.getElementById('header-title').textContent = 'Dashboard';
    inicializarGraficos();
}

function mostrarFormulario(event) {
    event.preventDefault();
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('formulario-section').style.display = 'block';
    document.getElementById('header-title').textContent = 'Usuarios';
}

function guardar() {
    let persona = {
        cedula: document.getElementById("cedula").value,
        nombres: document.getElementById("nombres").value,
        apellidos: document.getElementById("apellidos").value,
        email: document.getElementById("email").value,
        fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
        telefono: document.getElementById("telefono").value,
        sexo: document.getElementById("sexo").value,
        rol: document.getElementById("rol").value,
        fecha_registro: new Date().toLocaleDateString('es-ES')
    };

    arreglo_personas.push(persona);
    localStorage.setItem("list", JSON.stringify(arreglo_personas));
    limpiarFormulario();
    actualizarTabla();
    mostrarDashboard({ preventDefault: () => { } });
    alert('Usuario registrado exitosamente');
}

function limpiarFormulario() {
    document.getElementById("cedula").value = "";
    document.getElementById("nombres").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("email").value = "";
    document.getElementById("fecha_nacimiento").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("sexo").value = "masculino";
    document.getElementById("rol").value = "user";
}

function actualizarTabla() {
    const tbody = document.getElementById('usuarios-tbody');
    tbody.innerHTML = '';

    if (arreglo_personas && arreglo_personas.length > 0) {
        arreglo_personas.forEach((persona, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                    <img class="h-10 w-10 rounded-full"
                                        src="https://ui-avatars.com/api/?name=${persona.nombres}+${persona.apellidos}&background=0D8ABC&color=fff"
                                        alt="">
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">${persona.nombres} ${persona.apellidos}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">${persona.email}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">${persona.telefono}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${persona.rol === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">${persona.rol}</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${persona.fecha_registro}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <a href="#" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</a>
                            <a href="#" class="text-red-600 hover:text-red-900" onclick="eliminarUsuario(${index})">Eliminar</a>
                        </td>
                    `;
            tbody.appendChild(row);
        });
    }

    const total = arreglo_personas ? arreglo_personas.length : 0;
    document.getElementById('total-usuarios').textContent = total;
    document.getElementById('usuarios-mostrados').textContent = total;
    document.getElementById('total-usuarios-footer').textContent = total;
}

function eliminarUsuario(index) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        arreglo_personas.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(arreglo_personas));
        actualizarTabla();
    }
}

function inicializarGraficos() {
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: 'Ventas 2023',
                data: [6500, 5900, 8000, 8100, 8600, 8250, 9000, 9300, 8800, 9500, 10000, 10500],
                borderColor: '#4F46E5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const trafficCtx = document.getElementById('trafficChart').getContext('2d');
    new Chart(trafficCtx, {
        type: 'doughnut',
        data: {
            labels: ['Búsqueda Orgánica', 'Redes Sociales', 'Email', 'Directo', 'Referidos'],
            datasets: [{
                data: [35, 25, 20, 10, 10],
                backgroundColor: [
                    '#4F46E5',
                    '#10B981',
                    '#F59E0B',
                    '#EF4444',
                    '#8B5CF6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

window.addEventListener('DOMContentLoaded', function () {
    inicializarDatos();
    inicializarGraficos();
});