3. List all organizations that have only one account plan.

    SELECT o.orgName, a.planName
    FROM organization AS o
    INNER JOIN (
        SELECT organizationId, planName
        FROM account
        GROUP BY organizationId, planName
        HAVING COUNT(*) = 1
    ) AS a ON o.id = a.organizationId;
