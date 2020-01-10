var originalDecoded = jwt.decode(token, {complete: true}); 
var refreshed = jwt.refresh(originalDecoded, 3600, secret); |

