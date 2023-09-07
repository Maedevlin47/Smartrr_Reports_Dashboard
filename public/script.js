// Function to show the results on the web page

function displayResult(result, elementId) {
    const resultElement = document.getElementById(elementId);
    resultElement.innerHTML = JSON.stringify(result, null, 2);
  }
  
// 1st Report 

    function returnOptimizationSettings() {
        const shopifyDomain = document.getElementById('shopifyDomain').value;
        
        fetch(`/report1?myShopifyDomain=${shopifyDomain}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
                })
                .then((data) => {
                    displayResult(data, 'report1SettingResults');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }


// 2nd Report 

    function showDateStatusPlan() {
        fetch('/report2')
            .then((response)=> {
                if (!response.ok) {
                    throw new Error('Network Response Failed');
                }
                return response.json();
            })
            .then ((data) => {
                displayResult(data, 'report2PlanResults');
            })
            .catch((error)=> {
                console.error('Error:', error);
            })

    }



// 3rd Report 

    function returnCancelledOrgs(){
        fetch('/report3')
            .then((response) => {
                if (!response.ok){
                    throw new Error('Network Response Error');
                }
                return response.json();
            })
                .then((data) => {
                    displayResult(data, 'report3OrgResults');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    } 


// 4th Report 

    function returnOrgNameRecord (){
        const orgName = document.getElementById('orgName').value;

        fetch(`/report4?orgName=${orgName}`)
            .then ((response) => {
                if (!response.ok) {
                    throw new Error('Network Response Error');
                }
            return response.json();
            })
            .then((data) => {
                    displayResult(data, 'report4RecordResults');
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    }