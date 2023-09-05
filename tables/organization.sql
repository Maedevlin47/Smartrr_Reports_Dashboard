CREATE TABLE organization (
    createdDate DATETIME,
    updatedDate DATETIME,
    deletedAt DATETIME,
    id UUID PRIMARY KEY,
    orgName TEXT,
    shopifyStoreId INTEGER,
    myShopifyDomain TEXT,
    numBillingRetries INTEGER,
    numFailedCyclesBeforeCancel INTEGER,
    delayBetweenRetries INTEGER,
    logo TEXT,
    billingTime TIME,
    billingTimezone TEXT,
    initialSubscriptionImportComplete BOOLEAN,
    monthly_fee INTEGER,
    per_transaction_fee INTEGER,
    per_transaction_percentage_fee INTEGER,
    billing_start_date DATE,
    account JSONB,
    alloyUserId TEXT,
    activeWorkflows BOOLEAN,
    setup BOOLEAN,
    outOfStockBehavior TEXT,
    cancellationMessage TEXT,
    hasVisitedRetention BOOLEAN,
    rewardsPointMeaningId TEXT,
    hasOTPEnabled BOOLEAN,
    instagramUserData JSONB,
    lookerDashboardPrefix TEXT
);