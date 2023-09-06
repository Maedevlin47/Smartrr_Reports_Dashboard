2. How many organizations have more than one account plan?

    SELECT COUNT(*) AS CountOrganizationsWithMultiplePlans
    FROM (
        SELECT organizationId, COUNT(planName) AS PlanCount
        FROM account
        GROUP BY organizationId
        HAVING PlanCount > 1
    ) AS Subquery;