// const { User } = require('../../models');

const input = document.getElementById('input-claim');
const span = document.getElementById('availability');

  input.addEventListener('input', () => {
    const username = input.value.trim();

    if (username === '') {
      span.innerText = '';
      return;
    }

    const isUsernameTaken = checkIfUsernameExists(username);

    if (isUsernameTaken) {
      span.innerText = 'Not available';
      span.style.color = 'red';
    } else {
      span.innerText = 'Available';
      span.style.color = 'green';
    }
  });

   function checkIfUsernameExists(username) {
    
	const existingUsernames = ['john', 'sarah', 'james', 'emma', 'alex'];

	// FIX: Create an array usernames from social_dc then assign to 'existingUsernames' const
	/*
				const existingUsernames = await User.findOne({
				where: {
					username: req.params.username,
				},
				}); 
				res.json(username);
				
		
	*/

 	return existingUsernames.includes(username);
    // return false;
  };


  