

INSERT INTO priority (id, priority, created_at) VALUES (1, 'LOW', '2022-09-07 09:41:05.230393');
INSERT INTO priority (id, priority, created_at) VALUES (2, 'MEDIUM', '2022-09-07 09:41:05.230393');
INSERT INTO priority (id, priority, created_at) VALUES (3, 'HIGH', '2022-09-07 09:41:05.230393');
INSERT INTO priority (id, priority, created_at) VALUES (4, 'URGENT', '2022-09-07 09:41:05.230393');


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO status (id, status, created_at) VALUES (1, 'NEW', '2022-09-07 09:40:37.182217');
INSERT INTO status (id, status, created_at) VALUES (2, 'OPEN', '2022-09-07 09:40:37.182217');
INSERT INTO status (id, status, created_at) VALUES (3, 'DEVELOPMENT', '2022-09-07 09:40:37.182217');
INSERT INTO status (id, status, created_at) VALUES (4, 'TESTING', '2022-09-07 09:40:37.182217');
INSERT INTO status (id, status, created_at) VALUES (5, 'RESOLVED', '2022-09-07 09:40:37.182217');
INSERT INTO status (id, status, created_at) VALUES (6, 'CLOSED', '2022-09-07 09:40:37.182217');
INSERT INTO status (id, status, created_at) VALUES (7, 'ARCHIVED', '2022-09-07 09:40:37.182217');


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO projects (id, title, description, deadline, priority_id, status_id, created_at) VALUES (2, 'Project 1', 'Description for project 1', '2022-08-09', 1, 1, '2022-09-07 09:42:17.535363');
INSERT INTO projects (id, title, description, deadline, priority_id, status_id, created_at) VALUES (3, 'Project 1', 'Description for project 1', '2022-10-09', 4, 2, '2022-09-07 13:42:17.535');
INSERT INTO projects (id, title, description, deadline, priority_id, status_id, created_at) VALUES (4, 'New project', 'New project
', NULL, 1, 1, '2022-09-10 12:36:50.06');
INSERT INTO projects (id, title, description, deadline, priority_id, status_id, created_at) VALUES (5, 'New project', 'New project', '2022-09-10', 1, 1, '2022-09-10 12:38:10.248');
INSERT INTO projects (id, title, description, deadline, priority_id, status_id, created_at) VALUES (6, 'New project', 'New project', '2022-09-10', 1, 1, '2022-09-10 12:38:10.248');
INSERT INTO projects (id, title, description, deadline, priority_id, status_id, created_at) VALUES (7, 'New project', 'New project', '2022-09-10', 1, 1, '2022-09-10 13:26:13.026');
INSERT INTO projects (id, title, description, deadline, priority_id, status_id, created_at) VALUES (8, 'New project', 'New project', '2022-09-10', 1, 1, '2022-09-10 13:26:13.026');
INSERT INTO projects (id, title, description, deadline, priority_id, status_id, created_at) VALUES (9, 'New project', 'New project', '2022-09-10', 1, 1, '2022-09-10 13:26:13.026');
INSERT INTO projects (id, title, description, deadline, priority_id, status_id, created_at) VALUES (10, 'New Ticket', 'New Ticket', '2022-09-10', 1, 1, '2022-09-10 21:28:43.019');
INSERT INTO projects (id, title, description, deadline, priority_id, status_id, created_at) VALUES (11, 'New Ticket', 'New Ticket', '2022-09-10', 1, 1, '2022-09-10 21:28:43.019');


--
-- Data for Name: ticket_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO ticket_type (id, ticket_type, created_at) VALUES (1, 'UI', '2022-09-07 10:09:18.297551');
INSERT INTO ticket_type (id, ticket_type, created_at) VALUES (2, 'NEW DEVELOPMENT', '2022-09-07 10:09:18.297551');
INSERT INTO ticket_type (id, ticket_type, created_at) VALUES (3, 'MAINTENANCE', '2022-09-07 10:09:18.297551');
INSERT INTO ticket_type (id, ticket_type, created_at) VALUES (4, 'PESKY BUG', '2022-09-07 10:09:18.297551');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO users (id, first_name, last_name, avatar, email, password, address, mobile, allow_notification, created_at,role) VALUES (1, 'JImmy', 'Byses', NULL, 'jimmy@bugtracker.com', NULL, '123 Union  Street ', '123-456-7290', 0, '2022-09-07 08:22:45.124963', 3);
INSERT INTO users (id, first_name, last_name, avatar, email, password, address, mobile, allow_notification, created_at, role) VALUES (3, 'JImmy', 'Byses', NULL, 'jimmy2@bugtracker.com', NULL, '123 Union  Street ', '123-456-7390', 0, '2022-09-07 12:22:45.124', 3);
INSERT INTO users (id, first_name, last_name, avatar, email, password, address, mobile, allow_notification, created_at, role) VALUES (4, 'JImmy', 'Byses', NULL, 'jimmy3@bugtracker.com', NULL, '123 Union  Street ', '123-456-7490', 0, '2022-09-07 12:22:45.124', 3);
INSERT INTO users (id, first_name, last_name, avatar, email, password, address, mobile, allow_notification, created_at, role) VALUES (5, 'JImmy', 'Byses', NULL, 'jimmy4@bugtracker.com', NULL, '123 Union  Street ', '123-456-7590', 0, '2022-09-07 12:22:45.124', 3);
INSERT INTO users (id, first_name, last_name, avatar, email, password, address, mobile, allow_notification, created_at, role) VALUES (6, 'JImmy', 'Byses', NULL, 'jimmy5@bugtracker.com', NULL, '123 Union  Street ', '123-456-7690', 0, '2022-09-07 12:22:45.124', 3);
INSERT INTO users (id, first_name, last_name, avatar, email, password, address, mobile, allow_notification, created_at, role) VALUES (7, 'JImmy', 'Byses', NULL, 'jimmy6@bugtracker.com', NULL, '123 Union  Street ', '123-456-7890', 0, '2022-09-07 12:22:45.124', 3);


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tickets (id, title, description, priority_id, user_id, status_id, ticket_type_id, project_id, created_at) VALUES (1, 'New Ticket', 'New Ticket', 1, 1, 1, 1, 2, '2022-09-12 18:39:22.433');


--
-- Name: assignments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('assignments_id_seq', 1, false);


--
-- Name: permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('permission_id_seq', 1, false);


--
-- Name: priority_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('priority_id_seq', 4, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('projects_id_seq', 11, true);


--
-- Name: status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('status_id_seq', 7, true);


--
-- Name: ticket_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('ticket_type_id_seq', 4, true);


--
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tickets_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_id_seq', 7, true);