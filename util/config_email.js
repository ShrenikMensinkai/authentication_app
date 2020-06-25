const sgMail = require('@sendgrid/mail');

class Email{
    async sendPasswordMail(mailId,randomPass){
        try{
            let email = mailId.trim();
            sgMail.setApiKey('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');
            let msg = {
                to: email,
                from: 'no-reply@dhyio.com',
                subject: 'New Password',
                text: 'login',
                html: `<p>Passowrd - <strong>${randomPass}</strong>. 
                Use this password to login and reset the password</p>`,
            };
            sgMail.send(msg);
        }catch(error){
            throw error;
        }
    }
};

exports.Email = Email;