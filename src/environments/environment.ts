// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
   production: false
  ,apiUrl: 'http://localhost:3000'
  ,imageUrl: 'http://thumbnailtemplates.com/images/thumbs/'
};

export const regex = {
   // Limits to word characters and numbers (A-z, 0-9)
   textCharacters: new RegExp("^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$")

   // Requires at least 1 lowercase, 1 uppercase, 1 number, and 6 characters total
  ,mediumPassword: new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")
  ,strongPassword: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
}
