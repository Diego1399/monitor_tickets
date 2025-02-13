use monitorticket;

DELIMITER //
CREATE procedure create_ticket(
	in t_subject VARCHAR(255),
    in t_description text,
    in t_status VARCHAR(50),
    in t_specialist_id INT,
    in t_user_id INT
)
Begin
	DECLARE new_ticket_id INT;
    set new_ticket_id = (
		select MAX(aranda_ticket_id) 
        from tickets) + 1;
        
	if new_ticket_id is null then
		set new_ticket_id = 1000000;
	end if;
        
	INSERT INTO tickets (
        aranda_ticket_id,
        subject,
        description,
        status,
        created_at,
        updated_at,
        is_locked,
        specialist_id,
        category_id,
        sla_id,
        project_id,
        urgency_id,
        user_id
    ) VALUES (
        new_ticket_id,
        t_subject,
        t_description,
        t_status,
        NOW(),
        null,
        TRUE,
        t_specialist_id,
        null,
        null,
        null,
        null,
        t_user_id
    );
    COMMIT;
END;
//