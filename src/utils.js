const { parse } = require('node-html-parser');


module.exports = {
    cardsList: async (I, locator) => {
        const answer = [];
        const html = await I.grabHTMLFrom(locator);
        for(let i = 0; i < html.length; i++) {
          let qs = parse(html[i]).querySelector('.coral3-Card-title');
          if(!qs) {
            qs = parse(html[i]).querySelector('.globalnav-homecard-title');
          }
          if(!qs) {
            qs = parse(html[i]).querySelector('coral-card-title');
          }
          if(!qs) {
            _coral-Masonry-item              
          }
          if(qs) {
            answer.push(qs.innerHTML);
          } else {
              console.log(html[i])
          }
        }
        return answer;    
    },

    dismissPopover: async (I) => {
        const html = await I.grabSource();
        if(html.indexOf('granite-shell-onboarding-popover') >= 0) {
          I.click('Close');
        }
    }
}