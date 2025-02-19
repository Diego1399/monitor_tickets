use monitorticket;

create view historial_chat as
select 
	m.id_ticket,
	m.message,
    m.fecha_envio,
    u.username
from message m
inner join users u on u.id = m.id_usuario
order by m.fecha_envio asc;

CREATE VIEW ticket_view AS
SELECT 
    t.aranda_ticket_id,
    t.subject,
    t.description,
    t.status,
    date_format(t.created_at, '%d-%m-%Y') AS created_at,
    t.user_id,
    u1.username AS 'cliente',
    u2.username AS 'especialista'
FROM tickets t
INNER JOIN users u1 ON u1.id = t.user_id
INNER JOIN users u2 ON u2.id = t.specialist_id;