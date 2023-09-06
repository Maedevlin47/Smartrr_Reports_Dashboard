1. How many organizations do not have account plans?



SELECT
    SUM(CASE WHEN a.status = 'ACTIVE' THEN 1 ELSE 0 END) AS CountOrganizationsWithActivePlans,
    SUM(CASE WHEN a.status = 'CANCELLED' THEN 1 ELSE 0 END) AS CountOrganizationsWithCancelledPlans
FROM organization AS o
LEFT JOIN account AS a ON o.id = a.organizationId
WHERE a.status IN ('ACTIVE', 'CANCELLED') OR a.status IS NULL;


SELECT COUNT(*) AS CountOrganizationsWithBothActiveAndCancelledPlans
FROM (
    SELECT o.id
    FROM organization AS o
    LEFT JOIN account AS a ON o.id = a.organizationId
    WHERE a.status IN ('ACTIVE', 'CANCELLED')
    GROUP BY o.id
    HAVING COUNT(DISTINCT a.status) = 2
) AS Subquery;
