use monitorticket;

INSERT INTO users (aranda_user_id,username,email,password_hash,role,created_at,updated_at) 
VALUES (3,'Diego','diego.cortez@iungo.co','DC2023$$','admin',NOW(),NOW());

INSERT INTO tickets ( aranda_ticket_id,subject,description,status,created_at,updated_at,is_locked,specialist_id,user_id) 
VALUES (1007,'Test 6','El sistema presenta una falla en la carga de datos.','Abierto',NOW(),NOW(),TRUE,3,1);

update tickets set status = 'En Progreso'
where id = 7;

select t.aranda_ticket_id, t.subject, t.description, t.status, t.created_at, u1.username as 'Cliente', u2.username as 'Especialista'
from tickets t
inner join users u1 on u1.id = t.user_id
inner join users u2 on u2.id = t.specialist_id
where t.user_id = '1';


select * from users;
select * from tickets;
select * from ticket_view;