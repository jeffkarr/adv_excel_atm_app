## Questions

### What issues, if any, did you find with the existing code?
Initially, I was not familiar with the 'docker compose up' feature. 
I had issues with getting the app to load in the browser because I was not using the 'compose up' command. 
After I learned about 'compose up' I was uncertain if there was an intended bug placed in the docker-compose file.
After receiving confirmation from Michael Harung that there was no intentional error in the compose file, I was able to just start over and everything loaded as expected.  

### What issues, if any, did you find with the request to add functionality?
I had to read the following requirement several times before I understood what it was requesting. 
- The customer cannot withdraw more than they have in their account, unless it is a credit account, in which case 
they cannot withdraw more than their credit limit. 

I think the requirement could be stated clearer if it was broken into two sentences. Such as: 
The customer cannot withdraw more than they have in their account. 
However, if the account type is credit, the customer cannot withdraw more than their credit limit. 

### Would you modify the structure of this project if you were to start it over? If so, how?
I would add instructions for candidates to use 'docker compose build' then 'docker compose up' to get the app running. 

### Were there any pieces of this project that you were not able to complete that you'd like to mention?
No. 

### If you were to continue building this out, what would you like to add next?
Add more style to the AccountDashboard.  

### If you have any other comments or info you'd like the reviewers to know, please add them below.
I would like to thank Michael Hartung for giving me the compose clarification that I needed so I could complete this challenge.  