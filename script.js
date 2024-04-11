ZOHO.CREATOR.init()
        .then((data) => {

        const main = async ()=>{
            const initparams = ZOHO.CREATOR.UTIL.getInitParams();
            const login_id = initparams?initparams.loginUser:"";
            const config = { 
                appName : "order-management",
                reportName : "All_Franchisees", 
                criteria : `Email == "${login_id}"`
            }
            try{
                const franchise_obj = await ZOHO.CREATOR.API.getAllRecords(config);
                const my_frachise = franchise_obj.data[0];
                const name = document.querySelector(`#name`);
                const phone = document.querySelector(`#phone`);
                const email = document.querySelector(`#email`);
                const shipping_address = document.querySelector(`#s-address`);
                const gst_no = document.querySelector(`#gst`);
                const initial_quote = document.querySelector(`#init-quote`);
                const revised_quote = document.querySelector(`#revised-quote`);
                const billing_address = document.querySelector(`#b-address`);
                name.textContent = my_frachise.Customer_Name;
                phone.textContent = my_frachise.Phone_Number;
                email.textContent = my_frachise.Email;
                shipping_address.textContent = my_frachise.Address?my_frachise.Address.display_value:"";
                gst_no.textContent = my_frachise.GST_No;
                billing_address.textContent = my_frachise.Address?my_frachise.Address.display_value:"";
                await purchaseDetails(my_frachise);
                await getTC();
            }
            catch(error){
                console.log(error);
            }
            
        }
        main();

        const purchaseDetails = async (my_frachise)=>{
           config = {
            appName : "order-management",
                reportName : "All_Orders", 
                criteria : `Customer_Name == ${my_frachise.ID}`
           }
           try{
            const order_resp = await ZOHO.CREATOR.API.getAllRecords(config);
           if(order_resp.code == 3000){
            const order_obj = order_resp.data;
            let i = 0;
            order_obj.forEach(order => {
                i ++;
                const input_html = `<tr>
                <td>${i}</td>
                <td>${order.Order_Date}</td>
                <td>${order.Total}</td>
            </tr>`;
                const tr = document.createElement("tr");
                tr.innerHTML = input_html;
                const tbody = document.querySelector(`#orders`);
                tbody.appendChild(tr);
            })
           }
           }
           catch(error){
            console.log(error);
           }

        }

        const getTC = async ()=>{
            const config = { 
                appName : "order-management",
                reportName : "Terms_Conditions_Report"
            }
            try{
                const tc_resp = await ZOHO.CREATOR.API.getAllRecords(config);
                console.log(tc_resp);
                if(tc_resp.code == 3000){
                    const tc_obj = tc_resp.data;
                    let i = 0;
                    tc_obj.forEach(tc =>{
                        i ++
                        const inner_element = `<td>${i}</td>
                        <td>${tc.Title}</td>
                    <td class="text-center">
                        <input type="checkbox" >
                    </td>`;
                    const tr = document.createElement("tr");
                    tr.innerHTML = inner_element;
                    const tbody = document.querySelector("#terms");
                    tbody.appendChild(tr);
                    })
                }
            }
            catch(error){
                console.log(error);
            }
            

        }
        });