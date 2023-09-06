4. List all organizations that have the PASSWORDLESS feature set to true.

    SELECT o.id AS orgID, o.orgName
    FROM organization AS o 
    INNER JOIN account AS a ON o.id = a.organizationId
    WHERE a.features LIKE '%"PASSWORDLESS": true%';