import { useEffect, useContext, useState } from 'react'
import { Collapse, Table } from 'antd'
import ProjectsContext from 'store/context/ProjectsContext'

const CollapseThreats = ({ assets }) => {
	const { Panel } = Collapse
	const { threatCatalog } = useContext(ProjectsContext)
	const [threatAndAssets, setThreatAndAssets] = useState([])

	const catalog = [
		{
			title: '[essential] Activos esenciales',
			key: 'essential_assets',
			value: 'essential',
			children: [
				{
					title: '[info] información',
					key: 'essential_assets_info',
					value: 'info',
					children: [
						{
							title: '[adm] datos de interés para la administración pública',
							key: 'essential_assets_info_adm',
							value: 'adm',
						},
						{
							title: '[vr] datos vitales (registros de la organización) (1)',
							key: 'essential_assets_info_vr',
							value: 'vr',
						},
						{
							title: '[per] datos de carácter personal (2)',
							key: 'essential_assets_info_per',
							value: 'per',
							children: [
								{
									title: '[A] nivel alto',
									key: 'essential_assets_info_per_a',
									value: 'A',
								},
								{
									title: '[M] nivel medio',
									key: 'essential_assets_info_per_m',
									value: 'M',
								},
								{
									title: '[B] nivel bajo',
									key: 'essential_assets_info_per_b',
									value: 'B',
								},
							],
						},
						{
							title: '[classified] datos clasificados (3)',
							key: 'essential_assets_info_classified',
							value: 'classified',
							children: [
								{
									title: '[C] nivel confidencial',
									key: 'essential_assets_info_classified_c',
									value: 'C',
								},
								{
									title: '[R] difusión limitada',
									key: 'essential_assets_info_classified_r',
									value: 'R',
								},
								{
									title: '[UC] sin clasificar',
									key: 'essential_assets_info_classified_uc',
									value: 'UC',
								},
								{
									title: '[pub] de carácter público',
									key: 'essential_assets_info_classified_pub',
									value: 'pub',
								},
							],
						},
					],
				},
				{
					title: '[service] servicio',
					key: 'essential_assets_service',
					value: 'service',
				},
			],
		},
		{
			title: '[arch] Arquitectura del sistema',
			key: 'arch_system',
			value: 'arch',
			children: [
				{
					title: '[sap] punto de [acceso al] servicio (1)',
					key: 'arch_system_sap',
					value: 'sap',
				},
				{
					title: '[ip] punto de interconexión (2)',
					key: 'arch_system_ip',
					value: 'ip',
				},
				{
					title: '[ext] proporcionado por terceros (3)',
					key: 'arch_system_ext',
					value: 'ext',
				},
			],
		},
		{
			title: '[D] Datos / Información',
			key: 'd_data',
			value: 'D',
			children: [
				{
					title: '[files] ficheros',
					key: 'd_data_files',
					value: 'files',
				},
				{
					title: '[backup] copias de respaldo',
					key: 'd_data_backup',
					value: 'backup',
				},
				{
					title: '[conf] datos de configuración (1)',
					key: 'd_data_conf',
					value: 'conf',
				},
				{
					title: '[int] datos de gestión interna',
					key: 'd_data_int',
					value: 'int',
				},
				{
					title: '[password] credenciales (ej. contraseñas)',
					key: 'd_data_password',
					value: 'password',
				},
				{
					title: '[auth] datos de validación de credenciales',
					key: 'd_data_auth',
					value: 'auth',
				},
				{
					title: '[acl] datos de control de acceso',
					key: 'd_data_acl',
					value: 'acl',
				},
				{
					title: '[log] registro de actividad (2)',
					key: 'd_data_log',
					value: 'log',
				},
				{
					title: '[source] código fuente',
					key: 'd_data_source',
					value: 'source',
				},
				{
					title: '[exe] código ejecutable',
					key: 'd_data_exe',
					value: 'exe',
				},
				{
					title: '[test] datos de prueba',
					key: 'd_data_test',
					value: 'test',
				},
			],
		},
		{
			title: '[keys] Claves criptográficas',
			key: 'password_keys',
			value: 'keys',
			children: [
				{
					title: '[info] protección de la información',
					key: 'password_keys_info',
					value: 'info',
					children: [
						{
							title: '[encrypt] claves de cifra',
							key: 'password_keys_info_encrypt',
							value: 'encrypt',
							children: [
								{
									title:
										'[shared_secret] secreto compartido (clave simétrica) (1)',
									key: 'password_keys_info_encrypt_shared_secret',
									value: 'shared_secret',
								},
								{
									title: '[public_encryption] clave pública de cifra (2)',
									key: 'password_keys_info_encrypt_shared_public_encryption',
									value: 'public_encryption',
								},
								{
									title: '[public_decryption] clave privada de descifrado (2)',
									key: 'password_keys_info_encrypt_shared_public_decryption',
									value: 'public_decryption',
								},
							],
						},
						{
							title: '[sign] claves de firma',
							key: 'password_keys_info_sign',
							value: 'sign',
							children: [
								{
									title: '[shared_secret] secreto compartido (clave simétrica)',
									key: 'password_keys_info_sign_shared_secret',
									value: 'shared_secret',
								},
								{
									title: '[public_signature] clave privada de firma (2)',
									key: 'password_keys_info_sign_public_signature',
									value: 'public_signature',
								},
								{
									title:
										'[public_verification] clave pública de verificación de firma (2)',
									key: 'password_keys_info_sign_public_verification',
									value: 'public_verification',
								},
							],
						},
					],
				},
				{
					title: '[com] protección de las comunicaciones',
					key: 'password_keys_com',
					value: 'com',
					children: [
						{
							title: '[channel] claves de cifrado del canal',
							key: 'password_keys_com_channel',
							value: 'channel',
						},
						{
							title: '[authentication] claves de autenticación',
							key: 'password_keys_com_authentication',
							value: 'authentication',
						},
						{
							title: '[verification] claves de verificación de autenticación',
							key: 'password_keys_com_verification',
							value: 'verification',
						},
					],
				},
				{
					title: '[disk] cifrado de soportes de información',
					key: 'password_keys_disk',
					value: 'disk',
					children: [
						{
							title: '[encrypt] claves de cifra',
							key: 'password_keys_disk_encrypt',
							value: 'encrypt',
						},
					],
				},
				{
					title: '[x509] certificados de clave pública',
					key: 'password_keys_x509',
					value: 'x509',
				},
			],
		},
		{
			title: '[S] Servicios',
			key: 'services_s',
			value: 'S',
			children: [
				{
					title: '[anon] anónimo (sin requerir identificación del usuario)',
					key: 'services_s_anon',
					value: 'anon',
				},
				{
					title: '[pub] al público en general (sin relación contractual)',
					key: 'services_s_pub',
					value: 'pub',
				},
				{
					title: '[ext] a usuarios externos (bajo una relación contractual)',
					key: 'services_s_ext',
					value: 'ext',
				},
				{
					title: '[int] interno (a usuarios de la propia organización)',
					key: 'services_s_int',
					value: 'int',
				},
				{
					title: '[www] world wide web',
					key: 'services_s_www',
					value: 'www',
				},
				{
					title: '[telnet] acceso remoto a cuenta local',
					key: 'services_s_telnet',
					value: 'telnet',
				},
				{
					title: '[email] correo electrónico',
					key: 'services_s_email',
					value: 'email',
				},
				{
					title: '[file] almacenamiento de ficheros',
					key: 'services_s_file',
					value: 'file',
				},
				{
					title: '[ftp] transferencia de ficheros',
					key: 'services_s_ftp',
					value: 'ftp',
				},
				{
					title: '[edi] intercambio electrónico de datos',
					key: 'services_s_edi',
					value: 'edi',
				},
				{
					title: '[dir] servicio de directorio (1)',
					key: 'services_s_dir',
					value: 'dir',
				},
				{
					title: '[idm] gestión de identidades (2)',
					key: 'services_s_idm',
					value: 'idm',
				},
				{
					title: '[ipm] gestión de privilegios',
					key: 'services_s_ipm',
					value: 'ipm',
				},
				{
					title: '[pki] PKI - infraestructura de clave pública (3)',
					key: 'services_s_pki',
					value: 'pki',
				},
			],
		},
		{
			title: '[SW] Aplicaciones (software)',
			key: 'software_sw',
			value: 'SW',
			children: [
				{
					title: '[prp] desarrollo propio (in house)',
					key: 'software_sw_prp',
					value: 'prp',
				},
				{
					title: '[sub] desarrollo a medida (subcontratado)',
					key: 'software_sw_sub',
					value: 'sub',
				},
				{
					title: '[std] estándar (off the shelf)',
					key: 'software_sw_std',
					value: 'std',
					children: [
						{
							title: '[browser] navegador web',
							key: 'software_sw_std_browser',
							value: 'browser',
						},
						{
							title: '[www] servidor de presentación',
							key: 'software_sw_std_www',
							value: 'www',
						},
						{
							title: '[app] servidor de aplicaciones',
							key: 'software_sw_std_app',
							value: 'app',
						},
						{
							title: '[email_client] cliente de correo electrónico',
							key: 'software_sw_std_email_client',
							value: 'email_client',
						},
						{
							title: '[email_server] servidor de correo electrónico',
							key: 'software_sw_std_email_server',
							value: 'email_server',
						},
						{
							title: '[file] servidor de ficheros',
							key: 'software_sw_std_file',
							value: 'file',
						},
						{
							title: '[dbms] sistema de gestión de bases de datos',
							key: 'software_sw_std_dbms',
							value: 'dbms',
						},
						{
							title: '[tm] monitor transaccional',
							key: 'software_sw_std_tm',
							value: 'tm',
						},
						{
							title: '[office] ofimática',
							key: 'software_sw_std_office',
							value: 'office',
						},
						{
							title: '[av] anti virus',
							key: 'software_sw_std_av',
							value: 'av',
						},
						{
							title: '[os] sistema operativo',
							key: 'software_sw_std_os',
							value: 'os',
						},
						{
							title: '[hypervisor] gestor de máquinas virtuales',
							key: 'software_sw_std_hypervisor',
							value: 'hypervisor',
						},
						{
							title: '[ts] servidor de terminales',
							key: 'software_sw_std_ts',
							value: 'ts',
						},
						{
							title: '[backup] sistema de backup',
							key: 'software_sw_std_backup',
							value: 'backup',
						},
					],
				},
			],
		},
		{
			title: '[HW] Equipos informáticos (hardware)',
			key: 'hardware_hw',
			value: 'HW',
			children: [
				{
					title: '[host] grandes equipos (1)',
					key: 'hardware_hw_host',
					value: 'host',
				},
				{
					title: '[mid] equipos medios (2)',
					key: 'hardware_hw_mid',
					value: 'mid',
				},
				{
					title: '[pc] informática personal (3)',
					key: 'hardware_hw_pc',
					value: 'pc',
				},
				{
					title: '[mobile] informática móvil (4)',
					key: 'hardware_hw_mobile',
					value: 'mobile',
				},
				{
					title: '[pda] agendas electrónicas',
					key: 'hardware_hw_pda',
					value: 'pda',
				},
				{
					title: '[vhost] equipo virtual',
					key: 'hardware_hw_vhost',
					value: 'vhost',
				},
				{
					title: '[backup] equipamiento de respaldo (5)',
					key: 'hardware_hw_backup',
					value: 'backup',
				},
				{
					title: '[peripheral] periféricos',
					key: 'hardware_hw_peripheral',
					value: 'peripheral',
					children: [
						{
							title: '[print] medios de impresión (6)',
							key: 'hardware_hw_peripheral_print',
							value: 'print',
						},
						{
							title: '[scan] escáneres',
							key: 'hardware_hw_peripheral_scan',
							value: 'scan',
						},
						{
							title: '[crypto] dispositivos criptográficos',
							key: 'hardware_hw_peripheral_crypto',
							value: 'crypto',
						},
					],
				},
				{
					title: '[bp] dispositivo de frontera (7)',
					key: 'hardware_hw_bp',
					value: 'bp',
				},
				{
					title: '[network] soporte de la red (8)',
					key: 'hardware_hw_network',
					value: 'network',
					children: [
						{
							title: '[modem] módems',
							key: 'hardware_hw_network_modem',
							value: 'modem',
						},
						{
							title: '[hub] concentradores',
							key: 'hardware_hw_network_hub',
							value: 'hub',
						},
						{
							title: '[switch] conmutadores',
							key: 'hardware_hw_network_switch',
							value: 'switch',
						},
						{
							title: '[router] encaminadores',
							key: 'hardware_hw_network_router',
							value: 'router',
						},
						{
							title: '[bridge] pasarelas',
							key: 'hardware_hw_network_bridge',
							value: 'bridge',
						},
						{
							title: '[firewall] cortafuegos',
							key: 'hardware_hw_network_firewall',
							value: 'firewall',
						},
						{
							title: '[wap] punto de acceso inalámbrico',
							key: 'hardware_hw_network_wap',
							value: 'wap',
						},
					],
				},
				{
					title: '[pabx] centralita telefónica',
					key: 'hardware_hw_pabx',
					value: 'pabx',
				},
				{
					title: '[ipphone] teléfono IP',
					key: 'hardware_hw_ipphone',
					value: 'ipphone',
				},
			],
		},
		{
			title: '[COM] Redes de comunicaciones',
			key: 'networks_com',
			value: 'COM',
			children: [
				{
					title: '[PSTN] red telefónica',
					key: 'networks_com_pstn',
					value: 'PSTN',
				},
				{
					title: '[ISDN] rdsi (red digital)',
					key: 'networks_com_isdn',
					value: 'ISDN',
				},
				{
					title: '[X25] X25 (red de datos)',
					key: 'networks_com_x25',
					value: 'X25',
				},
				{
					title: '[ADSL] ADSL',
					key: 'networks_com_adsl',
					value: 'ADSL',
				},
				{
					title: '[pp] punto a punto',
					key: 'networks_com_pp',
					value: 'pp',
				},
				{
					title: '[radio] comunicaciones radio',
					key: 'networks_com_radio',
					value: 'radio',
				},
				{
					title: '[wifi] red inalámbrica',
					key: 'networks_com_wifi',
					value: 'wifi',
				},
				{
					title: '[mobile] telefonía móvil',
					key: 'networks_com_mobile',
					value: 'mobile',
				},
				{
					title: '[sat] por satélite',
					key: 'networks_com_sat',
					value: 'sat',
				},
				{
					title: '[LAN] red local',
					key: 'networks_com_lan',
					value: 'LAN',
				},
				{
					title: '[MAN] red metropolitana',
					key: 'networks_com_man',
					value: 'MAN',
				},
				{
					title: '[Internet] Internet',
					key: 'networks_com_internet',
					value: 'Internet',
				},
			],
		},
		{
			title: '[Media] Soportes de información',
			key: 'information_media',
			value: 'Media',
			children: [
				{
					title: '[electronic] electrónicos',
					key: 'information_media_electronic',
					value: 'electronic',
					children: [
						{
							title: '[disk] discos',
							key: 'information_media_electronic_disk',
							value: 'disk',
						},
						{
							title: '[vdisk] discos virtuales',
							key: 'information_media_electronic_vdisk',
							value: 'vdisk',
						},
						{
							title: '[san] almacenamiento en red',
							key: 'information_media_electronic_san',
							value: 'san',
						},
						{
							title: '[disquette] disquetes',
							key: 'information_media_electronic_disquette',
							value: 'disquette',
						},
						{
							title: '[cd] cederrón (CD-ROM)',
							key: 'information_media_electronic_cd',
							value: 'cd',
						},
						{
							title: '[usb] memorias USB',
							key: 'information_media_electronic_usb',
							value: 'usb',
						},
						{
							title: '[dvd] DVD',
							key: 'information_media_electronic_dvd',
							value: 'dvd',
						},
						{
							title: '[tape] cinta magnética',
							key: 'information_media_electronic_tape',
							value: 'tape',
						},
						{
							title: '[mc] tarjetas de memoria',
							key: 'information_media_electronic_mc',
							value: 'mc',
						},
						{
							title: '[ic] tarjetas inteligentes',
							key: 'information_media_electronic_ic',
							value: 'ic',
						},
					],
				},
				{
					title: '[non_electronic] no electrónicos',
					key: 'information_media_non_electronic',
					value: 'non_electronic',
					children: [
						{
							title: '[printed] material impreso',
							key: 'information_media_non_electronic_printed',
							value: 'printed',
						},
						{
							title: '[tape] cinta de papel',
							key: 'information_media_non_electronic_tape',
							value: 'tape',
						},
						{
							title: '[film] microfilm',
							key: 'information_media_non_electronic_film',
							value: 'film',
						},
						{
							title: '[cards] tarjetas perforadas',
							key: 'information_media_non_electronic_cards',
							value: 'cards',
						},
					],
				},
			],
		},
		{
			title: '[AUX] Equipamiento auxiliar',
			key: 'equipment_aux',
			value: 'AUX',
			children: [
				{
					title: '[power] fuentes de alimentación',
					key: 'equipment_aux_power',
					value: 'power',
				},
				{
					title: '[ups] sistemas de alimentación ininterrumpida',
					key: 'equipment_aux_ups',
					value: 'ups',
				},
				{
					title: '[gen] generadores eléctricos',
					key: 'equipment_aux_gen',
					value: 'gen',
				},
				{
					title: '[ac] equipos de climatización',
					key: 'equipment_aux_ac',
					value: 'ac',
				},
				{
					title: '[cabling] cableado',
					key: 'equipment_aux_cabling',
					value: 'cabling',
					children: [
						{
							title: '[wire] cable eléctrico',
							key: 'equipment_aux_cabling_wire',
							value: 'wire',
						},
						{
							title: '[fiber] fibra óptica',
							key: 'equipment_aux_cabling_fiber',
							value: 'fiber',
						},
					],
				},
				{
					title: '[robot] robots',
					key: 'equipment_aux_robots',
					value: 'robot',
					children: [
						{
							title: '[tape] ... de cintas',
							key: 'equipment_aux_robots_tape',
							value: 'tape',
						},
						{
							title: '[disk] ... de discos',
							key: 'equipment_aux_robots_disk',
							value: 'disk',
						},
					],
				},
				{
					title: '[supply] suministros esenciales',
					key: 'equipment_aux_supply',
					value: 'supply',
				},
				{
					title: '[destroy] equipos de destrucción de soportes de información',
					key: 'equipment_aux_destroy',
					value: 'destroy',
				},
				{
					title: '[furniture] mobiliario: armarios, etc',
					key: 'equipment_aux_furniture',
					value: 'furniture',
				},
				{
					title: '[safe] cajas fuertes',
					key: 'equipment_aux_safe',
					value: 'safe',
				},
			],
		},
		{
			title: '[L] Instalaciones',
			key: 'facilities',
			value: 'L',
			children: [
				{
					title: '[site] recinto',
					key: 'facilities_site',
					value: 'site',
				},
				{
					title: '[building] edificio',
					key: 'facilities_building',
					value: 'building',
				},
				{
					title: '[local] cuarto',
					key: 'facilities_local',
					value: 'local',
				},
				{
					title: '[mobile] plataformas móviles',
					key: 'facilities_mobile',
					value: 'mobile',
					children: [
						{
							title: '[car] vehículo terrestre: coche, camión, etc.',
							key: 'facilities_mobile_car',
							value: 'car',
						},
						{
							title: '[plane] vehículo aéreo: avión, etc.',
							key: 'facilities_mobile_plane',
							value: 'plane',
						},
						{
							title: '[ship] vehículo marítimo: buque, lancha, etc.',
							key: 'facilities_mobile_ship',
							value: 'ship',
						},
						{
							title: '[shelter] contenedores',
							key: 'facilities_mobile_shelter',
							value: 'shelter',
						},
					],
				},
				{
					title: '[channel] canalización',
					key: 'facilities_channel',
					value: 'channel',
				},
				{
					title: '[backup] instalaciones de respaldo',
					key: 'facilities_backup',
					value: 'backup',
				},
			],
		},
		{
			title: '[P] Personal',
			key: 'personal',
			value: 'P',
			children: [
				{
					title: '[ue] usuarios externos',
					key: 'personal_ue',
					value: 'ue',
				},
				{
					title: '[ui] usuarios internos',
					key: 'personal_ui',
					value: 'ui',
				},
				{
					title: '[op] operadores',
					key: 'personal_op',
					value: 'op',
				},
				{
					title: '[adm] administradores de sistemas',
					key: 'personal_adm',
					value: 'adm',
				},
				{
					title: '[com] administradores de comunicaciones',
					key: 'personal_com',
					value: 'com',
				},
				{
					title: '[dba] administradores de BBDD',
					key: 'personal_dba',
					value: 'dba',
				},
				{
					title: '[sec] administradores de seguridad',
					key: 'personal_sec',
					value: 'sec',
				},
				{
					title: '[des] desarrolladores / programadores',
					key: 'personal_des',
					value: 'des',
				},
				{
					title: '[sub] subcontratas',
					key: 'personal_sub',
					value: 'sub',
				},
				{
					title: '[prov] proveedores',
					key: 'personal_prov',
					value: 'prov',
				},
			],
		},
		{
			title: '[Iot] Internet de las cosas',
			key: 'iot',
			value: 'iot',
			children: [
				{
					title: '[lapp] nivel de aplicación',
					key: 'iot_lapp',
					value: 'lapp',
					children: [
						{
							title: 'smart home',
							key: 'iot_lapp_smart_home',
							value: 'smart',
						},
						{
							title: 'smart building',
							key: 'iot_lapp_smart_building',
							value: 'smart',
						},
					],
				},
				{
					title: '[lmidd] nivel de soporte de servicio y aplicaciones',
					key: 'iot_lmidd',
					value: 'lmidd',
				},
				{
					title: 'Autenticación',
					key: 'iot_autenticación',
					value: 'iot',
				},
				{
					title: 'Protocolos',
					key: 'iot_protocolos',
					value: 'iot',
					children: [
						{
							title: 'MQTT',
							key: 'iot_protocolos_mqtt',
							value: 'iot',
						},
						{
							title: 'AMQP',
							key: 'iot_protocolos_amqp',
							value: 'iot',
						},
						{
							title: 'HTTP/HTTPS',
							key: 'iot_protocolos_http',
							value: 'iot',
						},
						{
							title: 'Constrained application protocol (CoAP)',
							key: 'iot_protocolos_coap',
							value: 'iot',
						},
						{
							title: 'RESTFUL SERVICES',
							key: 'iot_protocolos_restful',
							value: 'iot',
						},
						{
							title: 'XMPP',
							key: 'iot_protocolos_xmpp',
							value: 'iot',
						},
						{
							title: 'DDS',
							key: 'iot_protocolos_dds',
							value: 'iot',
						},
						{
							title: 'WEB SOCKET',
							key: 'iot_protocolos_web_socket',
							value: 'iot',
						},
					],
				},
				{
					title: '[lnet] nivel de red',
					key: 'iot_lnet',
					value: 'lnet',
					children: [
						{
							title: 'Protocolos',
							key: 'iot_lnet_protocols',
							value: 'lnet',
						},
						{
							title: 'Tipos de comunicación',
							key: 'iot_lnet_communication_types',
							value: 'lnet',
							children: [
								{
									title: 'Corto alcance',
									key: 'iot_lnet_communication_types_ca',
									value: 'lnet',
									children: [
										{
											title: 'Bluetooth Low-Energy (BLE)',
											key: 'iot_lnet_communication_types_ca_ble',
											value: 'lnet',
										},
									],
								},
								{
									title: 'Mediano alcance',
									key: 'iot_lnet_communication_types_ma',
									value: 'lnet',
									children: [
										{
											title: 'Wifi',
											key: 'iot_lnet_communication_types_ma_wifi',
											value: 'lnet',
										},
									],
								},
								{
									title: 'Largo alcance',
									key: 'iot_lnet_communication_types_la',
									value: 'iot',
									children: [
										{
											title: 'LPWAN',
											key: 'iot_lnet_communication_types_ma_lapwan',
											value: 'iot',
											children: [
												{
													title: 'Lora',
													key: 'iot_lnet_communication_types_ma_lapwan_lora',
													value: 'iot',
												},
												{
													title: 'SigFox',
													key: 'iot_lnet_communication_types_ma_lapwan_sigfox',
													value: 'iot',
												},
											],
										},
										{
											title: 'Red Celular',
											key: 'iot_lnet_communication_types_ma_network_cell',
											value: 'iot',
											children: [
												{
													title: '3G',
													key:
														'iot_lnet_communication_types_ma_network_cell_3g',
													value: 'iot',
												},
												{
													title: '4G',
													key:
														'iot_lnet_communication_types_ma_network_cell_4g',
													value: 'iot',
												},
												{
													title: '5G',
													key:
														'iot_lnet_communication_types_ma_network_cell_5g',
													value: 'iot',
												},
											],
										},
										{
											title: 'Satelital',
											key: 'iot_lnet_communication_types_ma_satellite',
											value: 'iot',
										},
									],
								},
							],
						},
						{
							title: 'Infraestrutura de red IoT',
							key: 'iot_lnet_iot_infraestructure',
							value: 'iot',
							children: [
								{
									title: 'Gateway IoT',
									key: 'iot_lnet_iot_infraestructure_gateway',
									value: 'iot',
								},
								{
									title: 'Modem IoT',
									key: 'iot_lnet_iot_infraestructure_modem',
									value: 'iot',
								},
								{
									title: '[iotrouter] Router IoT',
									key: 'iot_lnet_iot_infraestructure_iotrouter',
									value: 'iot',
								},
								{
									title: 'Hub',
									key: 'iot_lnet_iot_infraestructure_hub',
									value: 'iot',
								},
							],
						},
					],
				},
				{
					title: '[lper] nivel de dispositivo',
					key: 'iot_lper',
					value: 'lper',
					children: [
						{
							title: '[sen] sensores',
							key: 'iot_lper_sen',
							value: 'sen',
							children: [
								{
									title: 'Sensor de luminosidad',
									key: 'iot_lper_sen_brightness',
									value: 'sen',
								},
								{
									title: 'Sensor de temperatura',
									key: 'iot_lper_sen_temperature',
									value: 'sen',
								},
								{
									title: 'Sensor de presencia',
									key: 'iot_lper_sen_presence',
									value: 'sen',
								},
								{
									title: 'Sensor de humedad',
									key: 'iot_lper_sen_humidity',
									value: 'sen',
								},
								{
									title: 'Sensor de presión',
									key: 'iot_lper_sen_pressure',
									value: 'sen',
								},
								{
									title: 'Sensor de radiación de luz infrarroja',
									key: 'iot_lper_sen_infrared_light',
									value: 'sen',
								},
								{
									title: 'Sensor de velocidad',
									key: 'iot_lper_sen_speed',
									value: 'sen',
								},
								{
									title: 'Sensor de sonido',
									key: 'iot_lper_sen_sound',
									value: 'sen',
								},
								{
									title: 'Sensor de Gas',
									key: 'iot_lper_sen_gas',
									value: 'sen',
									children: [
										{
											title: 'CO2',
											key: 'iot_lper_sen_gas_co2',
											value: 'sen',
										},
									],
								},
								{
									title: 'Camara',
									key: 'iot_lper_sen_camera',
									value: 'sen',
								},
								{
									title: 'Receptor GPS',
									key: 'iot_lper_sen_gps',
									value: 'sen',
								},
								{
									title: 'WSN (red de sensores inalámbricos)',
									key: 'iot_lper_sen_wsn',
									value: 'sen',
								},
								{
									title: 'WSAN (red de sensores y actuadores)',
									key: 'iot_lper_sen_wsan',
									value: 'sen',
								},
								{
									title: 'MWSN (red de sensores inalámbricos móviles)',
									key: 'iot_lper_sen_mwsn',
									value: 'sen',
								},
							],
						},
						{
							title: '[act] actuadores',
							key: 'iot_lper_act',
							value: 'act',
							children: [
								{
									title: 'Luces',
									key: 'iot_lper_act_lights',
									value: 'act',
								},
								{
									title: 'Valvula',
									key: 'iot_lper_act_valve',
									value: 'act',
								},
								{
									title: 'Motor',
									key: 'iot_lper_act_engine',
									value: 'act',
								},
								{
									title:
										'Comandos (acciones "suaves", distribución de archivos, actualizaciones de firmware)',
									key: 'iot_lper_act_commands',
									value: 'act',
								},
							],
						},
						{
							title: '[enddev] Dispositivos finales',
							key: 'iot_lper_enddev',
							value: 'enddev',
							children: [
								{
									title: 'smartphone',
									key: 'iot_lper_enddev_smartphone',
									value: 'enddev',
								},
								{
									title: 'Tablets',
									key: 'iot_lper_enddev_',
									value: 'enddev',
								},
								{
									title: 'Micro-controller Unit',
									key: 'iot_lper_enddev_micro_controller',
									value: 'enddev',
									children: [
										{
											title: 'Arduino',
											key: 'iot_lper_enddev_micro_controller_arduino',
											value: 'enddev',
										},
									],
								},
								{
									title: 'Single-board computers',
									key: 'iot_lper_enddev_single_board',
									value: 'enddev',
									children: [
										{
											title: 'Raspberry Pi',
											key: 'iot_lper_enddev_micro_controller_raspberry_pi',
											value: 'enddev',
										},
									],
								},
								{
									title: '[virass] asistente virtual',
									key: 'iot_lper_enddev_virass',
									value: 'virass',
								},
								{
									title: 'TV',
									key: 'iot_lper_enddev_tv',
									value: 'enddev',
								},
								{
									title: 'wereables',
									key: 'iot_lper_enddev_wereables',
									value: 'enddev',
								},
								{
									title: 'video juegos',
									key: 'iot_lper_enddev_games',
									value: 'enddev',
								},
								{
									title: 'computador',
									key: 'iot_lper_enddev_pc',
									value: 'enddev',
								},
							],
						},
						{
							title: '[appliance] accesorios',
							key: 'iot_lper_appliance',
							value: 'appliance',
							children: [
								{
									title: '[tag] tags',
									key: 'iot_lper_appliance_tags',
									value: 'tag',
									children: [
										{
											title: 'RFID',
											key: 'iot_lper_appliance_tags_rfid',
											value: 'tag',
										},
										{
											title: 'Barcode',
											key: 'iot_lper_appliance_tags_barcode',
											value: 'tag',
										},
									],
								},
								{
									title: 'Smart thermostats',
									key: 'iot_lper_appliance_thermostats',
									value: 'appliance',
									children: [
										{
											title: 'Nest Thermostats',
											key: 'iot_lper_appliance_thermostats_nest',
											value: 'appliance',
										},
									],
								},
								{
									title: '[smartlight] Smart lighting systems',
									key: 'iot_lper_appliance_smartlight',
									value: 'smartlight',
									children: [
										{
											title: 'Philips Hue',
											key: 'iot_lper_appliance_thermostats_nest_',
											value: 'smartlight',
										},
									],
								},
								{
									title: 'lavadora',
									key: 'iot_lper_appliance_washing_machine',
									value: 'appliance',
								},
								{
									title: 'cafetera',
									key: 'iot_lper_appliance_coffee_maker',
									value: 'appliance',
								},
								{
									title: 'refrigeradora',
									key: 'iot_lper_appliance_refrigerator',
									value: 'appliance',
								},
								{
									title: 'microondas',
									key: 'iot_lper_appliance_microwave',
									value: 'appliance',
								},
								{
									title: 'cocina',
									key: 'iot_lper_appliance_stove',
									value: 'appliance',
								},
							],
						},
					],
				},
			],
		},
	]

	const catalog2 = [
		{
			title: '[essential] Activos esenciales',
			key: 'essential_assets',
			value: 'essential',
			children: [
				{
					title: '[info] información',
					key: 'essential_assets_info',
					value: 'info',
					parentValue: 'essential',
					children: [
						{
							title: '[adm] datos de interés para la administración pública',
							key: 'essential_assets_info_adm',
							value: 'adm',
							parentValue: 'essential',
						},
						{
							title: '[vr] datos vitales (registros de la organización) (1)',
							key: 'essential_assets_info_vr',
							value: 'vr',
							parentValue: 'essential',
						},
						{
							title: '[per] datos de carácter personal (2)',
							key: 'essential_assets_info_per',
							value: 'per',
							parentValue: 'essential',
							children: [
								{
									title: '[A] nivel alto',
									key: 'essential_assets_info_per_a',
									value: 'A',
									parentValue: 'essential',
								},
								{
									title: '[M] nivel medio',
									key: 'essential_assets_info_per_m',
									value: 'M',
									parentValue: 'essential',
								},
								{
									title: '[B] nivel bajo',
									key: 'essential_assets_info_per_b',
									value: 'B',
									parentValue: 'essential',
								},
							],
						},
						{
							title: '[classified] datos clasificados (3)',
							key: 'essential_assets_info_classified',
							value: 'classified',
							parentValue: 'essential',
							children: [
								{
									title: '[C] nivel confidencial',
									key: 'essential_assets_info_classified_c',
									value: 'C',
									parentValue: 'essential',
								},
								{
									title: '[R] difusión limitada',
									key: 'essential_assets_info_classified_r',
									value: 'R',
									parentValue: 'essential',
								},
								{
									title: '[UC] sin clasificar',
									key: 'essential_assets_info_classified_uc',
									value: 'UC',
									parentValue: 'essential',
								},
								{
									title: '[pub] de carácter público',
									key: 'essential_assets_info_classified_pub',
									value: 'pub',
									parentValue: 'essential',
								},
							],
						},
					],
				},
				{
					title: '[service] servicio',
					key: 'essential_assets_service',
					value: 'service',
					parentValue: 'essential',
				},
			],
		},
		{
			title: '[arch] Arquitectura del sistema',
			key: 'arch_system',
			value: 'arch',
			children: [
				{
					title: '[sap] punto de [acceso al] servicio (1)',
					key: 'arch_system_sap',
					value: 'sap',
					parentValue: 'arch',
				},
				{
					title: '[ip] punto de interconexión (2)',
					key: 'arch_system_ip',
					value: 'ip',
					parentValue: 'arch',
				},
				{
					title: '[ext] proporcionado por terceros (3)',
					key: 'arch_system_ext',
					value: 'ext',
					parentValue: 'arch',
				},
			],
		},
		{
			title: '[D] Datos / Información',
			key: 'd_data',
			value: 'D',
			children: [
				{
					title: '[files] ficheros',
					key: 'd_data_files',
					value: 'files',
					parentValue: 'D',
				},
				{
					title: '[backup] copias de respaldo',
					key: 'd_data_backup',
					value: 'backup',
					parentValue: 'D',
				},
				{
					title: '[conf] datos de configuración (1)',
					key: 'd_data_conf',
					value: 'conf',
					parentValue: 'D',
				},
				{
					title: '[int] datos de gestión interna',
					key: 'd_data_int',
					value: 'int',
					parentValue: 'D',
				},
				{
					title: '[password] credenciales (ej. contraseñas)',
					key: 'd_data_password',
					value: 'password',
					parentValue: 'D',
				},
				{
					title: '[auth] datos de validación de credenciales',
					key: 'd_data_auth',
					value: 'auth',
					parentValue: 'D',
				},
				{
					title: '[acl] datos de control de acceso',
					key: 'd_data_acl',
					value: 'acl',
					parentValue: 'D',
				},
				{
					title: '[log] registro de actividad (2)',
					key: 'd_data_log',
					value: 'log',
					parentValue: 'D',
				},
				{
					title: '[source] código fuente',
					key: 'd_data_source',
					value: 'source',
					parentValue: 'D',
				},
				{
					title: '[exe] código ejecutable',
					key: 'd_data_exe',
					value: 'exe',
					parentValue: 'D',
				},
				{
					title: '[test] datos de prueba',
					key: 'd_data_test',
					value: 'test',
					parentValue: 'D',
				},
			],
		},
		{
			title: '[keys] Claves criptográficas',
			key: 'password_keys',
			value: 'keys',
			children: [
				{
					title: '[info] protección de la información',
					key: 'password_keys_info',
					value: 'info',
					parentValue: 'keys',
					children: [
						{
							title: '[encrypt] claves de cifra',
							key: 'password_keys_info_encrypt',
							value: 'encrypt',
							parentValue: 'keys',
							children: [
								{
									title:
										'[shared_secret] secreto compartido (clave simétrica) (1)',
									key: 'password_keys_info_encrypt_shared_secret',
									value: 'shared_secret',
									parentValue: 'keys',
								},
								{
									title: '[public_encryption] clave pública de cifra (2)',
									key: 'password_keys_info_encrypt_shared_public_encryption',
									value: 'public_encryption',
									parentValue: 'keys',
								},
								{
									title: '[public_decryption] clave privada de descifrado (2)',
									key: 'password_keys_info_encrypt_shared_public_decryption',
									value: 'public_decryption',
									parentValue: 'keys',
								},
							],
						},
						{
							title: '[sign] claves de firma',
							key: 'password_keys_info_sign',
							value: 'sign',
							parentValue: 'keys',
							children: [
								{
									title: '[shared_secret] secreto compartido (clave simétrica)',
									key: 'password_keys_info_sign_shared_secret',
									value: 'shared_secret',
									parentValue: 'keys',
								},
								{
									title: '[public_signature] clave privada de firma (2)',
									key: 'password_keys_info_sign_public_signature',
									value: 'public_signature',
									parentValue: 'keys',
								},
								{
									title:
										'[public_verification] clave pública de verificación de firma (2)',
									key: 'password_keys_info_sign_public_verification',
									value: 'public_verification',
									parentValue: 'keys',
								},
							],
						},
					],
				},
				{
					title: '[com] protección de las comunicaciones',
					key: 'password_keys_com',
					value: 'com',
					parentValue: 'keys',
					children: [
						{
							title: '[channel] claves de cifrado del canal',
							key: 'password_keys_com_channel',
							value: 'channel',
							parentValue: 'keys',
						},
						{
							title: '[authentication] claves de autenticación',
							key: 'password_keys_com_authentication',
							value: 'authentication',
							parentValue: 'keys',
						},
						{
							title: '[verification] claves de verificación de autenticación',
							key: 'password_keys_com_verification',
							value: 'verification',
							parentValue: 'keys',
						},
					],
				},
				{
					title: '[disk] cifrado de soportes de información',
					key: 'password_keys_disk',
					value: 'disk',
					parentValue: 'keys',
					children: [
						{
							title: '[encrypt] claves de cifra',
							key: 'password_keys_disk_encrypt',
							value: 'encrypt',
							parentValue: 'keys',
						},
					],
				},
				{
					title: '[x509] certificados de clave pública',
					key: 'password_keys_x509',
					value: 'x509',
					parentValue: 'keys',
				},
			],
		},
		{
			title: '[S] Servicios',
			key: 'services_s',
			value: 'S',
			children: [
				{
					title: '[anon] anónimo (sin requerir identificación del usuario)',
					key: 'services_s_anon',
					value: 'anon',
					parentValue: 'S',
				},
				{
					title: '[pub] al público en general (sin relación contractual)',
					key: 'services_s_pub',
					value: 'pub',
					parentValue: 'S',
				},
				{
					title: '[ext] a usuarios externos (bajo una relación contractual)',
					key: 'services_s_ext',
					value: 'ext',
					parentValue: 'S',
				},
				{
					title: '[int] interno (a usuarios de la propia organización)',
					key: 'services_s_int',
					value: 'int',
					parentValue: 'S',
				},
				{
					title: '[www] world wide web',
					key: 'services_s_www',
					value: 'www',
					parentValue: 'S',
				},
				{
					title: '[telnet] acceso remoto a cuenta local',
					key: 'services_s_telnet',
					value: 'telnet',
					parentValue: 'S',
				},
				{
					title: '[email] correo electrónico',
					key: 'services_s_email',
					value: 'email',
					parentValue: 'S',
				},
				{
					title: '[file] almacenamiento de ficheros',
					key: 'services_s_file',
					value: 'file',
					parentValue: 'S',
				},
				{
					title: '[ftp] transferencia de ficheros',
					key: 'services_s_ftp',
					value: 'ftp',
					parentValue: 'S',
				},
				{
					title: '[edi] intercambio electrónico de datos',
					key: 'services_s_edi',
					value: 'edi',
					parentValue: 'S',
				},
				{
					title: '[dir] servicio de directorio (1)',
					key: 'services_s_dir',
					value: 'dir',
					parentValue: 'S',
				},
				{
					title: '[idm] gestión de identidades (2)',
					key: 'services_s_idm',
					value: 'idm',
					parentValue: 'S',
				},
				{
					title: '[ipm] gestión de privilegios',
					key: 'services_s_ipm',
					value: 'ipm',
					parentValue: 'S',
				},
				{
					title: '[pki] PKI - infraestructura de clave pública (3)',
					key: 'services_s_pki',
					value: 'pki',
					parentValue: 'S',
				},
			],
		},
		{
			title: '[SW] Aplicaciones (software)',
			key: 'software_sw',
			value: 'SW',
			children: [
				{
					title: '[prp] desarrollo propio (in house)',
					key: 'software_sw_prp',
					value: 'prp',
					parentValue: 'SW',
				},
				{
					title: '[sub] desarrollo a medida (subcontratado)',
					key: 'software_sw_sub',
					value: 'sub',
					parentValue: 'SW',
				},
				{
					title: '[std] estándar (off the shelf)',
					key: 'software_sw_std',
					value: 'std',
					parentValue: 'SW',
					children: [
						{
							title: '[browser] navegador web',
							key: 'software_sw_std_browser',
							value: 'browser',
							parentValue: 'SW',
						},
						{
							title: '[www] servidor de presentación',
							key: 'software_sw_std_www',
							value: 'www',
							parentValue: 'SW',
						},
						{
							title: '[app] servidor de aplicaciones',
							key: 'software_sw_std_app',
							value: 'app',
							parentValue: 'SW',
						},
						{
							title: '[email_client] cliente de correo electrónico',
							key: 'software_sw_std_email_client',
							value: 'email_client',
							parentValue: 'SW',
						},
						{
							title: '[email_server] servidor de correo electrónico',
							key: 'software_sw_std_email_server',
							value: 'email_server',
							parentValue: 'SW',
						},
						{
							title: '[file] servidor de ficheros',
							key: 'software_sw_std_file',
							value: 'file',
							parentValue: 'SW',
						},
						{
							title: '[dbms] sistema de gestión de bases de datos',
							key: 'software_sw_std_dbms',
							value: 'dbms',
							parentValue: 'SW',
						},
						{
							title: '[tm] monitor transaccional',
							key: 'software_sw_std_tm',
							value: 'tm',
							parentValue: 'SW',
						},
						{
							title: '[office] ofimática',
							key: 'software_sw_std_office',
							value: 'office',
							parentValue: 'SW',
						},
						{
							title: '[av] anti virus',
							key: 'software_sw_std_av',
							value: 'av',
							parentValue: 'SW',
						},
						{
							title: '[os] sistema operativo',
							key: 'software_sw_std_os',
							value: 'os',
							parentValue: 'SW',
						},
						{
							title: '[hypervisor] gestor de máquinas virtuales',
							key: 'software_sw_std_hypervisor',
							value: 'hypervisor',
							parentValue: 'SW',
						},
						{
							title: '[ts] servidor de terminales',
							key: 'software_sw_std_ts',
							value: 'ts',
							parentValue: 'SW',
						},
						{
							title: '[backup] sistema de backup',
							key: 'software_sw_std_backup',
							value: 'backup',
							parentValue: 'SW',
						},
					],
				},
			],
		},
		{
			title: '[HW] Equipos informáticos (hardware)',
			key: 'hardware_hw',
			value: 'HW',
			children: [
				{
					title: '[host] grandes equipos (1)',
					key: 'hardware_hw_host',
					value: 'host',
					parentValue: 'HW',
				},
				{
					title: '[mid] equipos medios (2)',
					key: 'hardware_hw_mid',
					value: 'mid',
					parentValue: 'HW',
				},
				{
					title: '[pc] informática personal (3)',
					key: 'hardware_hw_pc',
					value: 'pc',
					parentValue: 'HW',
				},
				{
					title: '[mobile] informática móvil (4)',
					key: 'hardware_hw_mobile',
					value: 'mobile',
					parentValue: 'HW',
				},
				{
					title: '[pda] agendas electrónicas',
					key: 'hardware_hw_pda',
					value: 'pda',
					parentValue: 'HW',
				},
				{
					title: '[vhost] equipo virtual',
					key: 'hardware_hw_vhost',
					value: 'vhost',
					parentValue: 'HW',
				},
				{
					title: '[backup] equipamiento de respaldo (5)',
					key: 'hardware_hw_backup',
					value: 'backup',
					parentValue: 'HW',
				},
				{
					title: '[peripheral] periféricos',
					key: 'hardware_hw_peripheral',
					value: 'peripheral',
					parentValue: 'HW',

					children: [
						{
							title: '[print] medios de impresión (6)',
							key: 'hardware_hw_peripheral_print',
							value: 'print',
							parentValue: 'HW',
						},
						{
							title: '[scan] escáneres',
							key: 'hardware_hw_peripheral_scan',
							value: 'scan',
							parentValue: 'HW',
						},
						{
							title: '[crypto] dispositivos criptográficos',
							key: 'hardware_hw_peripheral_crypto',
							value: 'crypto',
							parentValue: 'HW',
						},
					],
				},
				{
					title: '[bp] dispositivo de frontera (7)',
					key: 'hardware_hw_bp',
					value: 'bp',
					parentValue: 'HW',
				},
				{
					title: '[network] soporte de la red (8)',
					key: 'hardware_hw_network',
					value: 'network',
					parentValue: 'HW',
					children: [
						{
							title: '[modem] módems',
							key: 'hardware_hw_network_modem',
							value: 'modem',
							parentValue: 'HW',
						},
						{
							title: '[hub] concentradores',
							key: 'hardware_hw_network_hub',
							value: 'hub',
							parentValue: 'HW',
						},
						{
							title: '[switch] conmutadores',
							key: 'hardware_hw_network_switch',
							value: 'switch',
							parentValue: 'HW',
						},
						{
							title: '[router] encaminadores',
							key: 'hardware_hw_network_router',
							value: 'router',
							parentValue: 'HW',
						},
						{
							title: '[bridge] pasarelas',
							key: 'hardware_hw_network_bridge',
							value: 'bridge',
							parentValue: 'HW',
						},
						{
							title: '[firewall] cortafuegos',
							key: 'hardware_hw_network_firewall',
							value: 'firewall',
							parentValue: 'HW',
						},
						{
							title: '[wap] punto de acceso inalámbrico',
							key: 'hardware_hw_network_wap',
							value: 'wap',
							parentValue: 'HW',
						},
					],
				},
				{
					title: '[pabx] centralita telefónica',
					key: 'hardware_hw_pabx',
					value: 'pabx',
					parentValue: 'HW',
				},
				{
					title: '[ipphone] teléfono IP',
					key: 'hardware_hw_ipphone',
					value: 'ipphone',
					parentValue: 'HW',
				},
			],
		},
		{
			title: '[COM] Redes de comunicaciones',
			key: 'networks_com',
			value: 'COM',
			children: [
				{
					title: '[PSTN] red telefónica',
					key: 'networks_com_pstn',
					value: 'PSTN',
					parentValue: 'COM',
				},
				{
					title: '[ISDN] rdsi (red digital)',
					key: 'networks_com_isdn',
					value: 'ISDN',
					parentValue: 'COM',
				},
				{
					title: '[X25] X25 (red de datos)',
					key: 'networks_com_x25',
					value: 'X25',
					parentValue: 'COM',
				},
				{
					title: '[ADSL] ADSL',
					key: 'networks_com_adsl',
					value: 'ADSL',
					parentValue: 'COM',
				},
				{
					title: '[pp] punto a punto',
					key: 'networks_com_pp',
					value: 'pp',
					parentValue: 'COM',
				},
				{
					title: '[radio] comunicaciones radio',
					key: 'networks_com_radio',
					value: 'radio',
					parentValue: 'COM',
				},
				{
					title: '[wifi] red inalámbrica',
					key: 'networks_com_wifi',
					value: 'wifi',
					parentValue: 'COM',
				},
				{
					title: '[mobile] telefonía móvil',
					key: 'networks_com_mobile',
					value: 'mobile',
					parentValue: 'COM',
				},
				{
					title: '[sat] por satélite',
					key: 'networks_com_sat',
					value: 'sat',
					parentValue: 'COM',
				},
				{
					title: '[LAN] red local',
					key: 'networks_com_lan',
					value: 'LAN',
					parentValue: 'COM',
				},
				{
					title: '[MAN] red metropolitana',
					key: 'networks_com_man',
					value: 'MAN',
					parentValue: 'COM',
				},
				{
					title: '[Internet] Internet',
					key: 'networks_com_internet',
					value: 'Internet',
					parentValue: 'COM',
				},
			],
		},
		{
			title: '[Media] Soportes de información',
			key: 'information_media',
			value: 'Media',
			children: [
				{
					title: '[electronic] electrónicos',
					key: 'information_media_electronic',
					value: 'electronic',
					parentValue: 'Media',
					children: [
						{
							title: '[disk] discos',
							key: 'information_media_electronic_disk',
							value: 'disk',
							parentValue: 'Media',
						},
						{
							title: '[vdisk] discos virtuales',
							key: 'information_media_electronic_vdisk',
							value: 'vdisk',
							parentValue: 'Media',
						},
						{
							title: '[san] almacenamiento en red',
							key: 'information_media_electronic_san',
							value: 'san',
							parentValue: 'Media',
						},
						{
							title: '[disquette] disquetes',
							key: 'information_media_electronic_disquette',
							value: 'disquette',
							parentValue: 'Media',
						},
						{
							title: '[cd] cederrón (CD-ROM)',
							key: 'information_media_electronic_cd',
							value: 'cd',
							parentValue: 'Media',
						},
						{
							title: '[usb] memorias USB',
							key: 'information_media_electronic_usb',
							value: 'usb',
							parentValue: 'Media',
						},
						{
							title: '[dvd] DVD',
							key: 'information_media_electronic_dvd',
							value: 'dvd',
							parentValue: 'Media',
						},
						{
							title: '[tape] cinta magnética',
							key: 'information_media_electronic_tape',
							value: 'tape',
							parentValue: 'Media',
						},
						{
							title: '[mc] tarjetas de memoria',
							key: 'information_media_electronic_mc',
							value: 'mc',
							parentValue: 'Media',
						},
						{
							title: '[ic] tarjetas inteligentes',
							key: 'information_media_electronic_ic',
							value: 'ic',
							parentValue: 'Media',
						},
					],
				},
				{
					title: '[non_electronic] no electrónicos',
					key: 'information_media_non_electronic',
					value: 'non_electronic',
					parentValue: 'Media',
					children: [
						{
							title: '[printed] material impreso',
							key: 'information_media_non_electronic_printed',
							value: 'printed',
							parentValue: 'Media',
						},
						{
							title: '[tape] cinta de papel',
							key: 'information_media_non_electronic_tape',
							value: 'tape',
							parentValue: 'Media',
						},
						{
							title: '[film] microfilm',
							key: 'information_media_non_electronic_film',
							value: 'film',
							parentValue: 'Media',
						},
						{
							title: '[cards] tarjetas perforadas',
							key: 'information_media_non_electronic_cards',
							value: 'cards',
							parentValue: 'Media',
						},
					],
				},
			],
		},
		{
			title: '[AUX] Equipamiento auxiliar',
			key: 'equipment_aux',
			value: 'AUX',
			children: [
				{
					title: '[power] fuentes de alimentación',
					key: 'equipment_aux_power',
					value: 'power',
					parentValue: 'AUX',
				},
				{
					title: '[ups] sistemas de alimentación ininterrumpida',
					key: 'equipment_aux_ups',
					value: 'ups',
					parentValue: 'AUX',
				},
				{
					title: '[gen] generadores eléctricos',
					key: 'equipment_aux_gen',
					value: 'gen',
					parentValue: 'AUX',
				},
				{
					title: '[ac] equipos de climatización',
					key: 'equipment_aux_ac',
					value: 'ac',
					parentValue: 'AUX',
				},
				{
					title: '[cabling] cableado',
					key: 'equipment_aux_cabling',
					value: 'cabling',
					parentValue: 'AUX',

					children: [
						{
							title: '[wire] cable eléctrico',
							key: 'equipment_aux_cabling_wire',
							value: 'wire',
							parentValue: 'AUX',
						},
						{
							title: '[fiber] fibra óptica',
							key: 'equipment_aux_cabling_fiber',
							value: 'fiber',
							parentValue: 'AUX',
						},
					],
				},
				{
					title: '[robot] robots',
					key: 'equipment_aux_robots',
					value: 'robot',
					parentValue: 'AUX',
					children: [
						{
							title: '[tape] ... de cintas',
							key: 'equipment_aux_robots_tape',
							value: 'tape',
							parentValue: 'AUX',
						},
						{
							title: '[disk] ... de discos',
							key: 'equipment_aux_robots_disk',
							value: 'disk',
							parentValue: 'AUX',
						},
					],
				},
				{
					title: '[supply] suministros esenciales',
					key: 'equipment_aux_supply',
					value: 'supply',
					parentValue: 'AUX',
				},
				{
					title: '[destroy] equipos de destrucción de soportes de información',
					key: 'equipment_aux_destroy',
					value: 'destroy',
					parentValue: 'AUX',
				},
				{
					title: '[furniture] mobiliario: armarios, etc',
					key: 'equipment_aux_furniture',
					value: 'furniture',
					parentValue: 'AUX',
				},
				{
					title: '[safe] cajas fuertes',
					key: 'equipment_aux_safe',
					value: 'safe',
					parentValue: 'AUX',
				},
			],
		},
		{
			title: '[L] Instalaciones',
			key: 'facilities',
			value: 'L',
			children: [
				{
					title: '[site] recinto',
					key: 'facilities_site',
					value: 'site',
					parentValue: 'L',
				},
				{
					title: '[building] edificio',
					key: 'facilities_building',
					value: 'building',
					parentValue: 'L',
				},
				{
					title: '[local] cuarto',
					key: 'facilities_local',
					value: 'local',
					parentValue: 'L',
				},
				{
					title: '[mobile] plataformas móviles',
					key: 'facilities_mobile',
					value: 'mobile',
					parentValue: 'L',
					children: [
						{
							title: '[car] vehículo terrestre: coche, camión, etc.',
							key: 'facilities_mobile_car',
							value: 'car',
							parentValue: 'L',
						},
						{
							title: '[plane] vehículo aéreo: avión, etc.',
							key: 'facilities_mobile_plane',
							value: 'plane',
							parentValue: 'L',
						},
						{
							title: '[ship] vehículo marítimo: buque, lancha, etc.',
							key: 'facilities_mobile_ship',
							value: 'ship',
							parentValue: 'L',
						},
						{
							title: '[shelter] contenedores',
							key: 'facilities_mobile_shelter',
							value: 'shelter',
							parentValue: 'L',
						},
					],
				},
				{
					title: '[channel] canalización',
					key: 'facilities_channel',
					value: 'channel',
					parentValue: 'L',
				},
				{
					title: '[backup] instalaciones de respaldo',
					key: 'facilities_backup',
					value: 'backup',
					parentValue: 'L',
				},
			],
		},
		{
			title: '[P] Personal',
			key: 'personal',
			value: 'P',
			children: [
				{
					title: '[ue] usuarios externos',
					key: 'personal_ue',
					value: 'ue',
					parentValue: 'P',
				},
				{
					title: '[ui] usuarios internos',
					key: 'personal_ui',
					value: 'ui',
					parentValue: 'P',
				},
				{
					title: '[op] operadores',
					key: 'personal_op',
					value: 'op',
					parentValue: 'P',
				},
				{
					title: '[adm] administradores de sistemas',
					key: 'personal_adm',
					value: 'adm',
					parentValue: 'P',
				},
				{
					title: '[com] administradores de comunicaciones',
					key: 'personal_com',
					value: 'com',
					parentValue: 'P',
				},
				{
					title: '[dba] administradores de BBDD',
					key: 'personal_dba',
					value: 'dba',
					parentValue: 'P',
				},
				{
					title: '[sec] administradores de seguridad',
					key: 'personal_sec',
					value: 'sec',
					parentValue: 'P',
				},
				{
					title: '[des] desarrolladores / programadores',
					key: 'personal_des',
					value: 'des',
					parentValue: 'P',
				},
				{
					title: '[sub] subcontratas',
					key: 'personal_sub',
					value: 'sub',
					parentValue: 'P',
				},
				{
					title: '[prov] proveedores',
					key: 'personal_prov',
					value: 'prov',
					parentValue: 'P',
				},
			],
		},
		{
			title: '[Iot] Internet de las cosas',
			key: 'iot',
			value: 'iot',
			children: [
				{
					title: '[lapp] nivel de aplicación',
					key: 'iot_lapp',
					value: 'lapp',
					parentValue: 'iot',
					children: [
						{
							title: 'smart home',
							key: 'iot_lapp_smart_home',
							value: 'smart',
							parentValue: 'iot',
						},
						{
							title: 'smart building',
							key: 'iot_lapp_smart_building',
							value: 'smart',
							parentValue: 'iot',
						},
					],
				},
				{
					title: '[lmidd] nivel de soporte de servicio y aplicaciones',
					key: 'iot_lmidd',
					value: 'lmidd',
					parentValue: 'iot',
				},
				{
					title: 'Autenticación',
					key: 'iot_autenticación',
					value: 'iot',
					parentValue: 'iot',
				},
				{
					title: 'Protocolos',
					key: 'iot_protocolos',
					value: 'iot',
					parentValue: 'iot',
					children: [
						{
							title: 'MQTT',
							key: 'iot_protocolos_mqtt',
							value: 'iot',
							parentValue: 'iot',
						},
						{
							title: 'AMQP',
							key: 'iot_protocolos_amqp',
							value: 'iot',
							parentValue: 'iot',
						},
						{
							title: 'HTTP/HTTPS',
							key: 'iot_protocolos_http',
							value: 'iot',
							parentValue: 'iot',
						},
						{
							title: 'Constrained application protocol (CoAP)',
							key: 'iot_protocolos_coap',
							value: 'iot',
							parentValue: 'iot',
						},
						{
							title: 'RESTFUL SERVICES',
							key: 'iot_protocolos_restful',
							value: 'iot',
							parentValue: 'iot',
						},
						{
							title: 'XMPP',
							key: 'iot_protocolos_xmpp',
							value: 'iot',
							parentValue: 'iot',
						},
						{
							title: 'DDS',
							key: 'iot_protocolos_dds',
							value: 'iot',
							parentValue: 'iot',
						},
						{
							title: 'WEB SOCKET',
							key: 'iot_protocolos_web_socket',
							value: 'iot',
							parentValue: 'iot',
						},
					],
				},
				{
					title: '[lnet] nivel de red',
					key: 'iot_lnet',
					value: 'lnet',
					parentValue: 'iot',
					children: [
						{
							title: 'Protocolos',
							key: 'iot_lnet_protocols',
							value: 'lnet',
							parentValue: 'iot',
						},
						{
							title: 'Tipos de comunicación',
							key: 'iot_lnet_communication_types',
							value: 'lnet',
							parentValue: 'iot',
							children: [
								{
									title: 'Corto alcance',
									key: 'iot_lnet_communication_types_ca',
									value: 'lnet',
									parentValue: 'iot',
									children: [
										{
											title: 'Bluetooth Low-Energy (BLE)',
											key: 'iot_lnet_communication_types_ca_ble',
											value: 'lnet',
											parentValue: 'iot',
										},
									],
								},
								{
									title: 'Mediano alcance',
									key: 'iot_lnet_communication_types_ma',
									value: 'lnet',
									parentValue: 'iot',
									children: [
										{
											title: 'Wifi',
											key: 'iot_lnet_communication_types_ma_wifi',
											value: 'lnet',
											parentValue: 'iot',
										},
									],
								},
								{
									title: 'Largo alcance',
									key: 'iot_lnet_communication_types_la',
									value: 'iot',
									parentValue: 'iot',
									children: [
										{
											title: 'LPWAN',
											key: 'iot_lnet_communication_types_ma_lapwan',
											value: 'iot',
											parentValue: 'iot',
											children: [
												{
													title: 'Lora',
													key: 'iot_lnet_communication_types_ma_lapwan_lora',
													value: 'iot',
													parentValue: 'iot',
												},
												{
													title: 'SigFox',
													key: 'iot_lnet_communication_types_ma_lapwan_sigfox',
													value: 'iot',
													parentValue: 'iot',
												},
											],
										},
										{
											title: 'Red Celular',
											key: 'iot_lnet_communication_types_ma_network_cell',
											value: 'iot',
											parentValue: 'iot',
											children: [
												{
													title: '3G',
													key:
														'iot_lnet_communication_types_ma_network_cell_3g',
													value: 'iot',
													parentValue: 'iot',
												},
												{
													title: '4G',
													key:
														'iot_lnet_communication_types_ma_network_cell_4g',
													value: 'iot',
													parentValue: 'iot',
												},
												{
													title: '5G',
													key:
														'iot_lnet_communication_types_ma_network_cell_5g',
													value: 'iot',
													parentValue: 'iot',
												},
											],
										},
										{
											title: 'Satelital',
											key: 'iot_lnet_communication_types_ma_satellite',
											value: 'iot',
											parentValue: 'iot',
										},
									],
								},
							],
						},
						{
							title: 'Infraestrutura de red IoT',
							key: 'iot_lnet_iot_infraestructure',
							value: 'iot',
							parentValue: 'iot',
							children: [
								{
									title: 'Gateway IoT',
									key: 'iot_lnet_iot_infraestructure_gateway',
									value: 'iot',
									parentValue: 'iot',
								},
								{
									title: 'Modem IoT',
									key: 'iot_lnet_iot_infraestructure_modem',
									value: 'iot',
									parentValue: 'iot',
								},
								{
									title: '[iotrouter] Router IoT',
									key: 'iot_lnet_iot_infraestructure_iotrouter',
									value: 'iot',
									parentValue: 'iot',
								},
								{
									title: 'Hub',
									key: 'iot_lnet_iot_infraestructure_hub',
									value: 'iot',
									parentValue: 'iot',
								},
							],
						},
					],
				},
				{
					title: '[lper] nivel de dispositivo',
					key: 'iot_lper',
					value: 'lper',
					parentValue: 'iot',
					children: [
						{
							title: '[sen] sensores',
							key: 'iot_lper_sen',
							value: 'sen',
							parentValue: 'iot',
							children: [
								{
									title: 'Sensor de luminosidad',
									key: 'iot_lper_sen_brightness',
									value: 'sen',
									parentValue: 'iot',
								},
								{
									title: 'Sensor de temperatura',
									key: 'iot_lper_sen_temperature',
									value: 'sen',
									parentValue: 'iot',
								},
								{
									title: 'Sensor de presencia',
									key: 'iot_lper_sen_presence',
									value: 'sen',
									parentValue: 'iot',
								},
								{
									title: 'Sensor de humedad',
									key: 'iot_lper_sen_humidity',
									value: 'sen',
									parentValue: 'iot',
								},
								{
									title: 'Sensor de presión',
									key: 'iot_lper_sen_pressure',
									value: 'sen',
									parentValue: 'iot',
								},
								{
									title: 'Sensor de radiación de luz infrarroja',
									key: 'iot_lper_sen_infrared_light',
									value: 'sen',
									parentValue: 'iot',
								},
								{
									title: 'Sensor de velocidad',
									key: 'iot_lper_sen_speed',
									value: 'sen',
									parentValue: 'iot',
								},
								{
									title: 'Sensor de sonido',
									key: 'iot_lper_sen_sound',
									value: 'sen',
									parentValue: 'iot',
								},
								{
									title: 'Sensor de Gas',
									key: 'iot_lper_sen_gas',
									value: 'sen',
									parentValue: 'iot',
									children: [
										{
											title: 'CO2',
											key: 'iot_lper_sen_gas_co2',
											value: 'sen',
											parentValue: 'iot',
										},
									],
								},
								{
									title: 'Camara',
									key: 'iot_lper_sen_camera',
									value: 'sen',
									parentValue: 'iot',
								},
								{
									title: 'Receptor GPS',
									key: 'iot_lper_sen_gps',
									value: 'sen',
									parentValue: 'iot',
								},
								{
									title: 'WSN (red de sensores inalámbricos)',
									key: 'iot_lper_sen_wsn',
									value: 'sen',
									parentValue: 'iot',
								},
								{
									title: 'WSAN (red de sensores y actuadores)',
									key: 'iot_lper_sen_wsan',
									value: 'sen',
									parentValue: 'iot',
								},
								{
									title: 'MWSN (red de sensores inalámbricos móviles)',
									key: 'iot_lper_sen_mwsn',
									value: 'sen',
									parentValue: 'iot',
								},
							],
						},
						{
							title: '[act] actuadores',
							key: 'iot_lper_act',
							value: 'act',
							parentValue: 'iot',
							children: [
								{
									title: 'Luces',
									key: 'iot_lper_act_lights',
									value: 'act',
									parentValue: 'iot',
								},
								{
									title: 'Valvula',
									key: 'iot_lper_act_valve',
									value: 'act',
									parentValue: 'iot',
								},
								{
									title: 'Motor',
									key: 'iot_lper_act_engine',
									value: 'act',
									parentValue: 'iot',
								},
								{
									title:
										'Comandos (acciones "suaves", distribución de archivos, actualizaciones de firmware)',
									key: 'iot_lper_act_commands',
									value: 'act',
									parentValue: 'iot',
								},
							],
						},
						{
							title: '[enddev] Dispositivos finales',
							key: 'iot_lper_enddev',
							value: 'enddev',
							parentValue: 'iot',
							children: [
								{
									title: 'smartphone',
									key: 'iot_lper_enddev_smartphone',
									value: 'enddev',
									parentValue: 'iot',
								},
								{
									title: 'Tablets',
									key: 'iot_lper_enddev_',
									value: 'enddev',
									parentValue: 'iot',
								},
								{
									title: 'Micro-controller Unit',
									key: 'iot_lper_enddev_micro_controller',
									value: 'enddev',
									parentValue: 'iot',
									children: [
										{
											title: 'Arduino',
											key: 'iot_lper_enddev_micro_controller_arduino',
											value: 'enddev',
											parentValue: 'iot',
										},
									],
								},
								{
									title: 'Single-board computers',
									key: 'iot_lper_enddev_single_board',
									value: 'enddev',
									parentValue: 'iot',
									children: [
										{
											title: 'Raspberry Pi',
											key: 'iot_lper_enddev_micro_controller_raspberry_pi',
											value: 'enddev',
											parentValue: 'iot',
										},
									],
								},
								{
									title: '[virass] asistente virtual',
									key: 'iot_lper_enddev_virass',
									value: 'virass',
									parentValue: 'iot',
								},
								{
									title: 'TV',
									key: 'iot_lper_enddev_tv',
									value: 'enddev',
									parentValue: 'iot',
								},
								{
									title: 'wereables',
									key: 'iot_lper_enddev_wereables',
									value: 'enddev',
									parentValue: 'iot',
								},
								{
									title: 'video juegos',
									key: 'iot_lper_enddev_games',
									value: 'enddev',
									parentValue: 'iot',
								},
								{
									title: 'computador',
									key: 'iot_lper_enddev_pc',
									value: 'enddev',
									parentValue: 'iot',
								},
							],
						},
						{
							title: '[appliance] accesorios',
							key: 'iot_lper_appliance',
							value: 'appliance',
							parentValue: 'iot',
							children: [
								{
									title: '[tag] tags',
									key: 'iot_lper_appliance_tags',
									value: 'tag',
									parentValue: 'iot',
									children: [
										{
											title: 'RFID',
											key: 'iot_lper_appliance_tags_rfid',
											value: 'tag',
											parentValue: 'iot',
										},
										{
											title: 'Barcode',
											key: 'iot_lper_appliance_tags_barcode',
											value: 'tag',
											parentValue: 'iot',
										},
									],
								},
								{
									title: 'Smart thermostats',
									key: 'iot_lper_appliance_thermostats',
									value: 'appliance',
									parentValue: 'iot',
									children: [
										{
											title: 'Nest Thermostats',
											key: 'iot_lper_appliance_thermostats_nest',
											value: 'appliance',
											parentValue: 'iot',
										},
									],
								},
								{
									title: '[smartlight] Smart lighting systems',
									key: 'iot_lper_appliance_smartlight',
									value: 'smartlight',
									parentValue: 'iot',
									children: [
										{
											title: 'Philips Hue',
											key: 'iot_lper_appliance_thermostats_nest_',
											value: 'smartlight',
											parentValue: 'iot',
										},
									],
								},
								{
									title: 'lavadora',
									key: 'iot_lper_appliance_washing_machine',
									value: 'appliance',
									parentValue: 'iot',
								},
								{
									title: 'cafetera',
									key: 'iot_lper_appliance_coffee_maker',
									value: 'appliance',
									parentValue: 'iot',
								},
								{
									title: 'refrigeradora',
									key: 'iot_lper_appliance_refrigerator',
									value: 'appliance',
									parentValue: 'iot',
								},
								{
									title: 'microondas',
									key: 'iot_lper_appliance_microwave',
									value: 'appliance',
									parentValue: 'iot',
								},
								{
									title: 'cocina',
									key: 'iot_lper_appliance_stove',
									value: 'appliance',
									parentValue: 'iot',
								},
							],
						},
					],
				},
			],
		},
	]

	useEffect(() => {
		if (assets.length !== 0 && threatCatalog.length !== 0) {
			const threats = assets.map((asset) => {
				const assetValue = asset?.classType?.parentValueData?.map((value) => {
					const searchData = searchTreeNode(threatCatalog, value)
					return searchData
				})
				return assetValue
			})
			const mergedData = mergeData(assets, threats)
			console.log('mergedData', mergedData)
			setThreatAndAssets(mergedData)
		}
	}, [threatCatalog, assets])

	const mergeData = (assets, threats) => {
		const mergedData = assets.map((asset, index) => ({
			asset,
			threats: threats[index],
		}))
		return mergedData
	}

	function searchTreeNode(threatCatalog, value) {
		const stack = [...threatCatalog]
		const result = []
		let node
		let parentNode
		while (stack.length > 0) {
			node = stack.pop()
			if (node.value.toUpperCase() === value.toUpperCase()) {
				result.push({
					parent: parentNode,
					children: node,
				})
			} else if (node.children && node.children.length) {
				parentNode = node
				for (let iterator = 0; iterator < node.children.length; iterator += 1) {
					stack.push(node.children[iterator])
				}
			}
		}
		return result
	}

	function callback(key) {
		console.log(key)
	}

	const columns = [
		{
			title: 'Amenaza',
			dataIndex: 'name',
			key: 'name',
		},
	]

	const buildThreatTable = (threats) => {
		console.log('threats', threats)
		const filterData = threats
			?.map((threat) =>
				threat?.map((threatData) => ({
					key: threatData?.parent?.key,
					name: threatData?.parent?.title,
				}))
			)
			.flat()
		console.log('filterData', filterData)
		return <Table columns={columns} bordered={true} dataSource={filterData} />
	}

	return (
		<>
			<Collapse
				defaultActiveKey={[0]}
				// activeKey={threatAndAssets[0]?.asset?.id}
				onChange={(key) => callback(key)}
			>
				{threatAndAssets.map((data, key) => (
					<Panel
						header={`${data?.asset?.name} / ${data?.asset?.model} / ${data?.asset?.identification}`}
						// key={data?.asset?.id}
						key={key}
					>
						{buildThreatTable(data?.threats)}
						{/* <div>
							{data?.threats?.map((threat) =>
								threat?.map((threatData, index) => (
									<div key={threatData?.parent?.key}>
										{threatData?.parent?.title}
									</div>
								))
							)}
						</div> */}
					</Panel>
				))}
			</Collapse>
		</>
	)
}

export default CollapseThreats
