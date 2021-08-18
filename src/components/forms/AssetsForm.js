import { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Spin, Drawer, Tree } from 'antd'
import { saveAssets, updateAssets } from 'epics/assetsEpics'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import ParamsContext from 'store/context/ParamsContext'

const AssetsForm = () => {
	const [form] = Form.useForm()
	const { assetsParams } = useContext(ParamsContext)
	const [spinner, setSpinner] = useState(false)
	const [isTreeEmpty, setIsTreeEmpty] = useState(false)
	const [tree, setTree] = useState([])
	const { getAssetsData } = useContext(ProjectsContext)
	const { setAssetsFormToggle, toggleFormAssets, assetsFormData } = useContext(
		ProjectsFormContext
	)
	const treeData = [
		{
			title: '[essential] Activos esenciales',
			key: 'essential_assets',
			children: [
				{
					title: '[info] información',
					key: 'essential_assets_info',
					children: [
						{
							title: '[adm] datos de interés para la administración pública',
							key: 'essential_assets_info_adm',
						},
						{
							title: '[vr] datos vitales (registros de la organización) (1)',
							key: 'essential_assets_info_vr',
						},
						{
							title: '[per] datos de carácter personal (2)',
							key: 'essential_assets_info_per',
							children: [
								{
									title: '[A] nivel alto',
									key: 'essential_assets_info_per_a',
								},
								{
									title: '[M] nivel medio',
									key: 'essential_assets_info_per_m',
								},
								{
									title: '[B] nivel bajo',
									key: 'essential_assets_info_per_b',
								},
							],
						},
						{
							title: '[classified] datos clasificados (3)',
							key: 'essential_assets_info_classified',
							children: [
								{
									title: '[C] nivel confidencial',
									key: 'essential_assets_info_classified_c',
								},
								{
									title: '[R] difusión limitada',
									key: 'essential_assets_info_classified_r',
								},
								{
									title: '[UC] sin clasificar',
									key: 'essential_assets_info_classified_uc',
								},
								{
									title: '[pub] de carácter público',
									key: 'essential_assets_info_classified_pub',
								},
							],
						},
					],
				},
				{
					title: '[service] servicio',
					key: 'essential_assets_service',
				},
			],
		},
		{
			title: '[arch] Arquitectura del sistema',
			key: 'arch_system',
			children: [
				{
					title: '[sap] punto de [acceso al] servicio (1)',
					key: 'arch_system_sap',
				},
				{
					title: '[ip] punto de interconexión (2)',
					key: 'arch_system_ip',
				},
				{
					title: '[ext] proporcionado por terceros (3)',
					key: 'arch_system_ext',
				},
			],
		},
		{
			title: '[D] Datos / Información',
			key: 'd_data',
			children: [
				{
					title: '[files] ficheros',
					key: 'd_data_files',
				},
				{
					title: '[backup] copias de respaldo',
					key: 'd_data_backup',
				},
				{
					title: '[conf] datos de configuración (1)',
					key: 'd_data_conf',
				},
				{
					title: '[int] datos de gestión interna',
					key: 'd_data_int',
				},
				{
					title: '[password] credenciales (ej. contraseñas)',
					key: 'd_data_password',
				},
				{
					title: '[auth] datos de validación de credenciales',
					key: 'd_data_auth',
				},
				{
					title: '[acl] datos de control de acceso',
					key: 'd_data_acl',
				},
				{
					title: '[log] registro de actividad (2)',
					key: 'd_data_log',
				},
				{
					title: '[source] código fuente',
					key: 'd_data_source',
				},
				{
					title: '[exe] código ejecutable',
					key: 'd_data_exe',
				},
				{
					title: '[test] datos de prueba',
					key: 'd_data_test',
				},
			],
		},
		{
			title: '[keys] Claves criptográficas',
			key: 'password_keys',
			children: [
				{
					title: '[info] protección de la información',
					key: 'password_keys_info',
					children: [
						{
							title: '[encrypt] claves de cifra',
							key: 'password_keys_info_encrypt',
							children: [
								{
									title:
										'[shared_secret] secreto compartido (clave simétrica) (1)',
									key: 'password_keys_info_encrypt_shared_secret',
								},
								{
									title: '[public_encryption] clave pública de cifra (2)',
									key: 'password_keys_info_encrypt_shared_public_encryption',
								},
								{
									title: '[public_decryption] clave privada de descifrado (2)',
									key: 'password_keys_info_encrypt_shared_public_decryption',
								},
							],
						},
						{
							title: '[sign] claves de firma',
							key: 'password_keys_info_sign',
							children: [
								{
									title: '[shared_secret] secreto compartido (clave simétrica)',
									key: 'password_keys_info_sign_shared_secret',
								},
								{
									title: '[public_signature] clave privada de firma (2)',
									key: 'password_keys_info_sign_public_signature',
								},
								{
									title:
										'[public_verification] clave pública de verificación de firma (2)',
									key: 'password_keys_info_sign_public_verification',
								},
							],
						},
					],
				},
				{
					title: '[com] protección de las comunicaciones',
					key: 'password_keys_com',
					children: [
						{
							title: '[channel] claves de cifrado del canal',
							key: 'password_keys_com_channel',
						},
						{
							title: '[authentication] claves de autenticación',
							key: 'password_keys_com_authentication',
						},
						{
							title: '[verification] claves de verificación de autenticación',
							key: 'password_keys_com_verification',
						},
					],
				},
				{
					title: '[disk] cifrado de soportes de información',
					key: 'password_keys_disk',
					children: [
						{
							title: '[encrypt] claves de cifra',
							key: 'password_keys_disk_encrypt',
						},
					],
				},
				{
					title: '[x509] certificados de clave pública',
					key: 'password_keys_x509',
				},
			],
		},
		{
			title: '[S] Servicios',
			key: 'services_s',
			children: [
				{
					title: '[anon] anónimo (sin requerir identificación del usuario)',
					key: 'services_s_anon',
				},
				{
					title: '[pub] al público en general (sin relación contractual)',
					key: 'services_s_pub',
				},
				{
					title: '[ext] a usuarios externos (bajo una relación contractual)',
					key: 'services_s_ext',
				},
				{
					title: '[int] interno (a usuarios de la propia organización)',
					key: 'services_s_int',
				},
				{
					title: '[www] world wide web',
					key: 'services_s_www',
				},
				{
					title: '[telnet] acceso remoto a cuenta local',
					key: 'services_s_telnet',
				},
				{
					title: '[email] correo electrónico',
					key: 'services_s_email',
				},
				{
					title: '[file] almacenamiento de ficheros',
					key: 'services_s_file',
				},
				{
					title: '[ftp] transferencia de ficheros',
					key: 'services_s_ftp',
				},
				{
					title: '[edi] intercambio electrónico de datos',
					key: 'services_s_edi',
				},
				{
					title: '[dir] servicio de directorio (1)',
					key: 'services_s_dir',
				},
				{
					title: '[idm] gestión de identidades (2)',
					key: 'services_s_idm',
				},
				{
					title: '[ipm] gestión de privilegios',
					key: 'services_s_ipm',
				},
				{
					title: '[pki] PKI - infraestructura de clave pública (3)',
					key: 'services_s_pki',
				},
			],
		},
		{
			title: '[SW] Aplicaciones (software)',
			key: 'software_sw',
			children: [
				{
					title: '[prp] desarrollo propio (in house)',
					key: 'software_sw_prp',
				},
				{
					title: '[sub] desarrollo a medida (subcontratado)',
					key: 'software_sw_sub',
				},
				{
					title: '[std] estándar (off the shelf)',
					key: 'software_sw_std',
					children: [
						{
							title: '[browser] navegador web',
							key: 'software_sw_std_browser',
						},
						{
							title: '[www] servidor de presentación',
							key: 'software_sw_std_www',
						},
						{
							title: '[app] servidor de aplicaciones',
							key: 'software_sw_std_app',
						},
						{
							title: '[email_client] cliente de correo electrónico',
							key: 'software_sw_std_email_client',
						},
						{
							title: '[email_server] servidor de correo electrónico',
							key: 'software_sw_std_email_server',
						},
						{
							title: '[file] servidor de ficheros',
							key: 'software_sw_std_file',
						},
						{
							title: '[dbms] sistema de gestión de bases de datos',
							key: 'software_sw_std_dbms',
						},
						{
							title: '[tm] monitor transaccional',
							key: 'software_sw_std_tm',
						},
						{
							title: '[office] ofimática',
							key: 'software_sw_std_office',
						},
						{
							title: '[av] anti virus',
							key: 'software_sw_std_av',
						},
						{
							title: '[os] sistema operativo',
							key: 'software_sw_std_os',
						},
						{
							title: '[hypervisor] gestor de máquinas virtuales',
							key: 'software_sw_std_hypervisor',
						},
						{
							title: '[ts] servidor de terminales',
							key: 'software_sw_std_ts',
						},
						{
							title: '[backup] sistema de backup',
							key: 'software_sw_std_backup',
						},
					],
				},
			],
		},
		{
			title: '[HW] Equipos informáticos (hardware)',
			key: 'hardware_hw',
			children: [
				{
					title: '[host] grandes equipos (1)',
					key: 'hardware_hw_host',
				},
				{
					title: '[mid] equipos medios (2)',
					key: 'hardware_hw_mid',
				},
				{
					title: '[pc] informática personal (3)',
					key: 'hardware_hw_pc',
				},
				{
					title: '[mobile] informática móvil (4)',
					key: 'hardware_hw_mobile',
				},
				{
					title: '[pda] agendas electrónicas',
					key: 'hardware_hw_pda',
				},
				{
					title: '[vhost] equipo virtual',
					key: 'hardware_hw_vhost',
				},
				{
					title: '[backup] equipamiento de respaldo (5)',
					key: 'hardware_hw_backup',
				},
				{
					title: '[peripheral] periféricos',
					key: 'hardware_hw_peripheral',
					children: [
						{
							title: '[print] medios de impresión (6)',
							key: 'hardware_hw_peripheral_print',
						},
						{
							title: '[scan] escáneres',
							key: 'hardware_hw_peripheral_scan',
						},
						{
							title: '[crypto] dispositivos criptográficos',
							key: 'hardware_hw_peripheral_crypto',
						},
					],
				},
				{
					title: '[bp] dispositivo de frontera (7)',
					key: 'hardware_hw_bp',
				},
				{
					title: '[network] soporte de la red (8)',
					key: 'hardware_hw_network',
					children: [
						{
							title: '[modem] módems',
							key: 'hardware_hw_network_modem',
						},
						{
							title: '[hub] concentradores',
							key: 'hardware_hw_network_hub',
						},
						{
							title: '[switch] conmutadores',
							key: 'hardware_hw_network_switch',
						},
						{
							title: '[router] encaminadores',
							key: 'hardware_hw_network_router',
						},
						{
							title: '[bridge] pasarelas',
							key: 'hardware_hw_network_bridge',
						},
						{
							title: '[firewall] cortafuegos',
							key: 'hardware_hw_network_firewall',
						},
						{
							title: '[wap] punto de acceso inalámbrico',
							key: 'hardware_hw_network_wap',
						},
					],
				},
				{
					title: '[pabx] centralita telefónica',
					key: 'hardware_hw_pabx',
				},
				{
					title: '[ipphone] teléfono IP',
					key: 'hardware_hw_ipphone',
				},
			],
		},
		{
			title: '[COM] Redes de comunicaciones',
			key: 'networks_com',
			children: [
				{
					title: '[PSTN] red telefónica',
					key: 'networks_com_pstn',
				},
				{
					title: '[ISDN] rdsi (red digital)',
					key: 'networks_com_isdn',
				},
				{
					title: '[X25] X25 (red de datos)',
					key: 'networks_com_x25',
				},
				{
					title: '[ADSL] ADSL',
					key: 'networks_com_adsl',
				},
				{
					title: '[pp] punto a punto',
					key: 'networks_com_pp',
				},
				{
					title: '[radio] comunicaciones radio',
					key: 'networks_com_radio',
				},
				{
					title: '[wifi] red inalámbrica',
					key: 'networks_com_wifi',
				},
				{
					title: '[mobile] telefonía móvil',
					key: 'networks_com_mobile',
				},
				{
					title: '[sat] por satélite',
					key: 'networks_com_sat',
				},
				{
					title: '[LAN] red local',
					key: 'networks_com_lan',
				},
				{
					title: '[MAN] red metropolitana',
					key: 'networks_com_man',
				},
				{
					title: '[Internet] Internet',
					key: 'networks_com_internet',
				},
			],
		},
		{
			title: '[Media] Soportes de información',
			key: 'information_media',
			children: [
				{
					title: '[electronic] electrónicos',
					key: 'information_media_electronic',
					children: [
						{
							title: '[disk] discos',
							key: 'information_media_electronic_disk',
						},
						{
							title: '[vdisk] discos virtuales',
							key: 'information_media_electronic_vdisk',
						},
						{
							title: '[san] almacenamiento en red',
							key: 'information_media_electronic_san',
						},
						{
							title: '[disquette] disquetes',
							key: 'information_media_electronic_disquette',
						},
						{
							title: '[cd] cederrón (CD-ROM)',
							key: 'information_media_electronic_cd',
						},
						{
							title: '[usb] memorias USB',
							key: 'information_media_electronic_usb',
						},
						{
							title: '[dvd] DVD',
							key: 'information_media_electronic_dvd',
						},
						{
							title: '[tape] cinta magnética',
							key: 'information_media_electronic_tape',
						},
						{
							title: '[mc] tarjetas de memoria',
							key: 'information_media_electronic_mc',
						},
						{
							title: '[ic] tarjetas inteligentes',
							key: 'information_media_electronic_ic',
						},
					],
				},
				{
					title: '[non_electronic] no electrónicos',
					key: 'information_media_non_electronic',
					children: [
						{
							title: '[printed] material impreso',
							key: 'information_media_non_electronic_printed',
						},
						{
							title: '[tape] cinta de papel',
							key: 'information_media_non_electronic_tape',
						},
						{
							title: '[film] microfilm',
							key: 'information_media_non_electronic_film',
						},
						{
							title: '[cards] tarjetas perforadas',
							key: 'information_media_non_electronic_cards',
						},
					],
				},
			],
		},
		{
			title: '[AUX] Equipamiento auxiliar',
			key: 'equipment_aux',
			children: [
				{
					title: '[power] fuentes de alimentación',
					key: 'equipment_aux_power',
				},
				{
					title: '[ups] sistemas de alimentación ininterrumpida',
					key: 'equipment_aux_ups',
				},
				{
					title: '[gen] generadores eléctricos',
					key: 'equipment_aux_gen',
				},
				{
					title: '[ac] equipos de climatización',
					key: 'equipment_aux_ac',
				},
				{
					title: '[cabling] cableado',
					key: 'equipment_aux_cabling',
					children: [
						{
							title: '[wire] cable eléctrico',
							key: 'equipment_aux_cabling_wire',
						},
						{
							title: '[fiber] fibra óptica',
							key: 'equipment_aux_cabling_fiber',
						},
					],
				},
				{
					title: '[robot] robots',
					key: 'equipment_aux_robots',
					children: [
						{
							title: '[tape] ... de cintas',
							key: 'equipment_aux_robots_tape',
						},
						{
							title: '[disk] ... de discos',
							key: 'equipment_aux_robots_disk',
						},
					],
				},
				{
					title: '[supply] suministros esenciales',
					key: 'equipment_aux_supply',
				},
				{
					title: '[destroy] equipos de destrucción de soportes de información',
					key: 'equipment_aux_destroy',
				},
				{
					title: '[furniture] mobiliario: armarios, etc',
					key: 'equipment_aux_furniture',
				},
				{
					title: '[safe] cajas fuertes',
					key: 'equipment_aux_safe',
				},
			],
		},
		{
			title: '[L] Instalaciones',
			key: 'facilities',
			children: [
				{ title: '[site] recinto', key: 'facilities_site' },
				{ title: '[building] edificio', key: 'facilities_building' },
				{ title: '[local] cuarto', key: 'facilities_local' },
				{
					title: '[mobile] plataformas móviles',
					key: 'facilities_mobile',
					children: [
						{
							title: '[car] vehículo terrestre: coche, camión, etc.',
							key: 'facilities_mobile_car',
						},
						{
							title: '[plane] vehículo aéreo: avión, etc.',
							key: 'facilities_mobile_plane',
						},
						{
							title: '[ship] vehículo marítimo: buque, lancha, etc.',
							key: 'facilities_mobile_ship',
						},
						{
							title: '[shelter] contenedores',
							key: 'facilities_mobile_shelter',
						},
					],
				},
				{ title: '[channel] canalización', key: 'facilities_channel' },
				{
					title: '[backup] instalaciones de respaldo',
					key: 'facilities_backup',
				},
			],
		},
		{
			title: '[P] Personal',
			key: 'personal',
			children: [
				{
					title: '[ue] usuarios externos',
					key: 'personal_ue',
				},
				{
					title: '[ui] usuarios internos',
					key: 'personal_ui',
				},
				{
					title: '[op] operadores',
					key: 'personal_op',
				},
				{
					title: '[adm] administradores de sistemas',
					key: 'personal_adm',
				},
				{
					title: '[com] administradores de comunicaciones',
					key: 'personal_com',
				},
				{
					title: '[dba] administradores de BBDD',
					key: 'personal_dba',
				},
				{
					title: '[sec] administradores de seguridad',
					key: 'personal_sec',
				},
				{
					title: '[des] desarrolladores / programadores',
					key: 'personal_des',
				},
				{
					title: '[sub] subcontratas',
					key: 'personal_sub',
				},
				{
					title: '[prov] proveedores',
					key: 'personal_prov',
				},
			],
		},
		{
			title: '[Iot] Internet de las cosas',
			key: 'iot',
			children: [
				{
					title: '[lapp] nivel de aplicación',
					key: 'iot_lapp',
					children: [
						{
							title: 'smart home',
							key: 'iot_lapp_smart_home',
						},
						{
							title: 'smart building',
							key: 'iot_lapp_smart_building',
						},
					],
				},
				{
					title: '[lmidd] nivel de soporte de servicio y aplicaciones',
					key: 'iot_lmidd',
				},
				{
					title: 'Autenticación',
					key: 'iot_autenticación',
				},
				{
					title: 'Protocolos',
					key: 'iot_protocolos',
					children: [
						{
							title: 'MQTT',
							key: 'iot_protocolos_mqtt',
						},
						{
							title: 'AMQP',
							key: 'iot_protocolos_amqp',
						},
						{
							title: 'HTTP/HTTPS',
							key: 'iot_protocolos_http',
						},
						{
							title: 'Constrained application protocol (CoAP)',
							key: 'iot_protocolos_coap',
						},
						{
							title: 'RESTFUL SERVICES',
							key: 'iot_protocolos_restful',
						},
						{
							title: 'XMPP',
							key: 'iot_protocolos_xmpp',
						},
						{
							title: 'DDS',
							key: 'iot_protocolos_dds',
						},
						{
							title: 'WEB SOCKET',
							key: 'iot_protocolos_web_socket',
						},
					],
				},
				{
					title: '[lnet] nivel de red',
					key: 'iot_lnet',
					children: [
						{
							title: 'Protocolos',
							key: 'iot_lnet_protocols',
						},
						{
							title: 'Tipos de comunicación',
							key: 'iot_lnet_communication_types',
							children: [
								{
									title: 'Corto alcance',
									key: 'iot_lnet_communication_types_ca',
									children: [
										{
											title: 'Bluetooth Low-Energy (BLE)',
											key: 'iot_lnet_communication_types_ca_ble',
										},
									],
								},
								{
									title: 'Mediano alcance',
									key: 'iot_lnet_communication_types_ma',
									children: [
										{
											title: 'Wifi',
											key: 'iot_lnet_communication_types_ma_wifi',
										},
									],
								},
								{
									title: 'Largo alcance',
									key: 'iot_lnet_communication_types_la',
									children: [
										{
											title: 'LPWAN',
											key: 'iot_lnet_communication_types_ma_lapwan',
											children: [
												{
													title: 'Lora',
													key: 'iot_lnet_communication_types_ma_lapwan_lora',
												},
												{
													title: 'SigFox',
													key: 'iot_lnet_communication_types_ma_lapwan_sigfox',
												},
											],
										},
										{
											title: 'Red Celular',
											key: 'iot_lnet_communication_types_ma_network_cell',
											children: [
												{
													title: '3G',
													key:
														'iot_lnet_communication_types_ma_network_cell_3g',
												},
												{
													title: '4G',
													key:
														'iot_lnet_communication_types_ma_network_cell_4g',
												},
												{
													title: '5G',
													key:
														'iot_lnet_communication_types_ma_network_cell_5g',
												},
											],
										},
										{
											title: 'Satelital',
											key: 'iot_lnet_communication_types_ma_satellite',
										},
									],
								},
							],
						},
						{
							title: 'Infraestrutura de red IoT',
							key: 'iot_lnet_iot_infraestructure',
							children: [
								{
									title: 'Gateway IoT',
									key: 'iot_lnet_iot_infraestructure_gateway',
								},
								{
									title: 'Modem IoT',
									key: 'iot_lnet_iot_infraestructure_modem',
								},
								{
									title: '[iotrouter] Router IoT',
									key: 'iot_lnet_iot_infraestructure_iotrouter',
								},
								{
									title: 'Hub',
									key: 'iot_lnet_iot_infraestructure_hub',
								},
							],
						},
					],
				},
				{
					title: '[lper] nivel de dispositivo',
					key: 'iot_lper',
					children: [
						{
							title: '[sen] sensores',
							key: 'iot_lper_sen',
							children: [
								{
									title: 'Sensor de luminosidad',
									key: 'iot_lper_sen_brightness',
								},
								{
									title: 'Sensor de temperatura',
									key: 'iot_lper_sen_temperature',
								},
								{
									title: 'Sensor de presencia',
									key: 'iot_lper_sen_presence',
								},
								{
									title: 'Sensor de humedad',
									key: 'iot_lper_sen_humidity',
								},
								{
									title: 'Sensor de presión',
									key: 'iot_lper_sen_pressure',
								},
								{
									title: 'Sensor de radiación de luz infrarroja',
									key: 'iot_lper_sen_infrared_light',
								},
								{
									title: 'Sensor de velocidad',
									key: 'iot_lper_sen_speed',
								},
								{
									title: 'Sensor de sonido',
									key: 'iot_lper_sen_sound',
								},
								{
									title: 'Sensor de Gas',
									key: 'iot_lper_sen_gas',
									children: [
										{
											title: 'CO2',
											key: 'iot_lper_sen_gas_co2',
										},
									],
								},
								{
									title: 'Camara',
									key: 'iot_lper_sen_camera',
								},
								{
									title: 'Receptor GPS',
									key: 'iot_lper_sen_gps',
								},
								{
									title: 'WSN (red de sensores inalámbricos)',
									key: 'iot_lper_sen_wsn',
								},
								{
									title: 'WSAN (red de sensores y actuadores)',
									key: 'iot_lper_sen_wsan',
								},
								{
									title: 'MWSN (red de sensores inalámbricos móviles)',
									key: 'iot_lper_sen_mwsn',
								},
							],
						},
						{
							title: '[act] actuadores',
							key: 'iot_lper_act',
							children: [
								{
									title: 'Luces',
									key: 'iot_lper_act_lights',
								},
								{
									title: 'Valvula',
									key: 'iot_lper_act_valve',
								},
								{
									title: 'Motor',
									key: 'iot_lper_act_engine',
								},
								{
									title:
										'Comandos (acciones "suaves", distribución de archivos, actualizaciones de firmware)',
									key: 'iot_lper_act_commands',
								},
							],
						},
						{
							title: '[enddev] Dispositivos finales',
							key: 'iot_lper_enddev',
							children: [
								{
									title: 'smartphone',
									key: 'iot_lper_enddev_smartphone',
								},
								{
									title: 'Tablets',
									key: 'iot_lper_enddev_',
								},
								{
									title: 'Micro-controller Unit',
									key: 'iot_lper_enddev_micro_controller',
									children: [
										{
											title: 'Arduino',
											key: 'iot_lper_enddev_micro_controller_arduino',
										},
									],
								},
								{
									title: 'Single-board computers',
									key: 'iot_lper_enddev_single_board',
									children: [
										{
											title: 'Raspberry Pi',
											key: 'iot_lper_enddev_micro_controller_raspberry_pi',
										},
									],
								},
								{
									title: '[virass] asistente virtual',
									key: 'iot_lper_enddev_virass',
								},
								{
									title: 'TV',
									key: 'iot_lper_enddev_tv',
								},
								{
									title: 'wereables',
									key: 'iot_lper_enddev_wereables',
								},
								{
									title: 'video juegos',
									key: 'iot_lper_enddev_games',
								},
								{
									title: 'computador',
									key: 'iot_lper_enddev_pc',
								},
							],
						},
						{
							title: '[appliance] accesorios',
							key: 'iot_lper_appliance',
							children: [
								{
									title: '[tag] tags',
									key: 'iot_lper_appliance_tags',
									children: [
										{
											title: 'RFID',
											key: 'iot_lper_appliance_tags_rfid',
										},
										{
											title: 'Barcode',
											key: 'iot_lper_appliance_tags_barcode',
										},
									],
								},
								{
									title: 'Smart thermostats',
									key: 'iot_lper_appliance_thermostats',
									children: [
										{
											title: 'Nest Thermostats',
											key: 'iot_lper_appliance_thermostats_nest',
										},
									],
								},
								{
									title: '[smartlight] Smart lighting systems',
									key: 'iot_lper_appliance_smartlight',
									children: [
										{
											title: 'Philips Hue',
											key: 'iot_lper_appliance_thermostats_nest_',
										},
									],
								},
								{
									title: 'lavadora',
									key: 'iot_lper_appliance_washing_machine',
								},
								{
									title: 'cafetera',
									key: 'iot_lper_appliance_coffee_maker',
								},
								{
									title: 'refrigeradora',
									key: 'iot_lper_appliance_refrigerator',
								},
								{
									title: 'microondas',
									key: 'iot_lper_appliance_microwave',
								},
								{
									title: 'cocina',
									key: 'iot_lper_appliance_stove',
								},
							],
						},
					],
				},
			],
		},
	]
	const onReset = () => {
		form.resetFields()
	}

	const onFinish = async (values) => {
		if (tree.length === 0) {
			setIsTreeEmpty(true)
			return
		}
		setSpinner(true)
		if (assetsFormData.id) {
			const response = await updateAssets(
				assetsFormData.id,
				values.identification,
				values.name,
				values.model,
				assetsParams,
				tree
			)
			await setAfterSaveProjects(response)
		} else {
			const response = await saveAssets(
				values.identification,
				values.name,
				values.model,
				assetsParams,
				tree
			)
			await setAfterSaveProjects(response)
		}
	}

	const setAfterSaveProjects = async (response) => {
		if (response) {
			setAssetsFormToggle()
			await getAssetsData(assetsParams)
			onReset()
		}
		setSpinner(false)
	}

	const onCheck = (checkedKeys) => {
		setIsTreeEmpty(false)
		setTree(checkedKeys)
	}

	useEffect(() => {
		if (toggleFormAssets) {
			form.setFieldsValue({
				identification: assetsFormData.identification,
				name: assetsFormData.name,
				model: assetsFormData.model,
			})
			setTree(assetsFormData.classType)
		}
	}, [assetsFormData])

	return (
		<>
			<Drawer
				className='assets-main-form'
				title={assetsFormData.name || 'Nuevo Activo'}
				placement='right'
				width='400px'
				onClose={setAssetsFormToggle}
				visible={toggleFormAssets}
			>
				<Spin spinning={spinner}>
					<Form
						name='assets-form'
						className='assets-form'
						onFinish={onFinish}
						layout='vertical'
						form={form}
					>
						<Form.Item
							label='Identificación del activo'
							name='identification'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese la identificación del activo!',
								},
							]}
						>
							<Input placeholder='Identificación del activo' type='text' />
						</Form.Item>
						<Form.Item
							label='Nombre del activo'
							name='name'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese el nombre del activo!',
								},
							]}
						>
							<Input placeholder='Nombre del activo' type='text' />
						</Form.Item>
						<Form.Item
							label='Modelo del activo'
							name='model'
							className='main-form-item'
							rules={[
								{
									required: true,
									message: '¡Ingrese el modelo del activo!',
								},
							]}
						>
							<Input type='text' placeholder='Modelo del activo' />
						</Form.Item>
						<div className='ant-col ant-form-item-label'>Clase de activo</div>
						{isTreeEmpty && (
							<div className='ant-form-item-explain ant-form-item-explain-error'>
								<div role='alert'>¡Ingrese la clase del activo!</div>
							</div>
						)}
						<Tree
							checkable
							onCheck={onCheck}
							treeData={treeData}
							defaultCheckedKeys={assetsFormData.classType}
							checkedKeys={tree}
						/>
						<Form.Item className='main-button-content'>
							<Button
								type='primary'
								htmlType='submit'
								className='assets-form-button'
								block
							>
								Crear Activo
							</Button>
						</Form.Item>
					</Form>
				</Spin>
			</Drawer>
		</>
	)
}

export default AssetsForm
