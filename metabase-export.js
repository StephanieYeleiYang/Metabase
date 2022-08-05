//import axios from 'axios';
const axios = require("axios");
const fs = require('fs');


async function exportFun() {
    try {

        const sourceUrl = "http://localhost:3000/api/";

          // login in metabase

          const loginResult = await axios.post(`${sourceUrl}session/` , {
            "username" : "stephanie.yeleiyang@gmail.com",
            "password" : "Sisy265204."
        });

        const metabaseSesstion = loginResult.data.id;

        let jsonFileObject = {
            sourceDashboards : [],
            sourceCollections : [],
            sourceCards : [],
            sourceDashboardCards : []
        }

        // for metbase dashboards
      const sourceDashboards = await axios.get(`${sourceUrl}dashboard/` , {
        headers: {
            'X-Metabase-Session':metabaseSesstion
        }
       });


       // for metabase collections

       const sourceCollections = await axios.get(`${sourceUrl}collection/` , {
        headers: {
            'X-Metabase-Session':metabaseSesstion
        }
       });



      // for metabase cards

       const sourceCards = await axios.get(`${sourceUrl}card/` , {
        headers: {
            'X-Metabase-Session':metabaseSesstion
        }
       });


       jsonFileObject.sourceDashboards = sourceDashboards.data;
       jsonFileObject.sourceCollections = sourceCollections.data;
       jsonFileObject.sourceCards = sourceCards.data;


     // for metabase dashboard cards

     for(let i of sourceDashboards.data) {
        const sourceDashboardCards = await axios.get(`${sourceUrl}dashboard/${i.id}` , {
            headers: {
                'X-Metabase-Session':metabaseSesstion
            }
           });


        jsonFileObject.sourceDashboardCards.push(
            sourceDashboardCards.data
        )


     }



        // save data into a json file and export it
        
    const path = "./metabase";
    !fs.existsSync(path) && fs.mkdirSync(path, { recursive: true })
    await fs.writeFileSync(`${path}/data.json`, JSON.stringify(jsonFileObject))


    } catch (error) {
      return error
    }
  }

  exportFun();