# QR Code Generator
### https://rw-qr.netlify.app/
![screenshot](https://user-images.githubusercontent.com/2629902/156913974-4e2ed993-46c5-4371-ae59-5e0c004c6f02.png)

### Which feature of RedwoodJS does it demo?
- Web only; No API side.
- [Forms](https://redwoodjs.com/docs/forms)
- [MetaTags](https://redwoodjs.com/docs/seo-head#setting-meta-tags-open-graph-directives) for Page title.
- [Web tests](https://redwoodjs.com/docs/testing#testing-components)
- [Storybook](https://redwoodjs.com/docs/storybook).
- RedwoodJS CLI: [generate page](https://redwoodjs.com/docs/cli-commands#generate-alias-g), [generate component](https://redwoodjs.com/docs/cli-commands#generate-component), [setup deploy](https://redwoodjs.com/docs/cli-commands#setup-deploy-config), [setup ui](https://redwoodjs.com/docs/cli-commands#setup-ui)

### What's the dev workflow like using RedwoodJS?
- Start new project `yarn create redwood-app --typescript rw-example-qr-code-generator`
- Setup Tailwind: `yarn rw setup ui tailwind`. Project uses tailwind forms plugin: `cd web`  and install with `yarn add -D @tailwindcss/forms`. [Add this plugin](https://github.com/callingmedic911/rw-example-qr-code-generator/commit/392b3ace5f41202ce44db7fcb5513bcbbdb0c91c) in `web/config/tailwind.config.js`
- Start the dev server: `yarn rw dev`.
- Create a page with `yarn rw g page Home`. Update `web/Routes.ts` to handle root path `/` to this page.
- Use command `yarn rw g component <name>`. It will generate component, test and storybook files. This project used this command for `Button`, `QRGenerator` and `TabSelector`. 
- Dev time! Code up and style the components in `web/src/components/`. Add more tests.
- Lastly to deploy, setup with `yarn rw setup deploy netlify`. Modify `netlify.toml` and update `command`  to `command = "yarn rw deploy netlify --no-prisma --no-data-migrate"` since we don't need don't have any side, therefore no DB.
- Open Netlify, select the repo. Deploy. Done!

### Setup

To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```
#### Fire it up

```terminal
yarn redwood dev
```

Your browser should open automatically to `http://localhost:8910` to see the web app. 

## More about RedwoodJS

- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood): getting started and complete overview guide.

- [Docs](https://redwoodjs.com/docs/introduction): using the Redwood Router, handling assets and files, list of command-line tools, and more.

- [Redwood Community](https://community.redwoodjs.com): get help, share tips and tricks, and collaborate on everything about RedwoodJS.
