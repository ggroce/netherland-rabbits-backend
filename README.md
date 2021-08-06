## NodeJS backend for [www.NetherlandBunnies.com](https://www.netherlandbunnies.com "NetherlandBunnies.com")
###### (Github for React frontend for this project found [here](https://github.com/ggroce/netherland-rabbits-frontend "Frontend: netherland-rabbits-frontend"))

<br>
Backend for Netherland Rabbits sales website, where users can see an up-to-date listing of available Netherland Dwarf rabbits for sale, find out more about the purchasing process, and fill out a contact form for more information.  

### Details on the backend
* NodeJS backend serving REST API for inventory queries and contact forms
* Sendgrid nodemailer implementation used to forward inquries to website operator
* Inventory on backend is fed from a Google Sheet
  * Provided through google-spreadsheet package
  * This makes editing of the website inventory trivial for the layperson
