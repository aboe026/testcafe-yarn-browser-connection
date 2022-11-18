# testcafe-yarn-browser-connection

Repository with minimal reproduceable setup to produce bug where testcafe cannot connect to browser with yarn.

## Steps to Reproduce

1. Install dependencies: `yarn install`
2. Run testcafe tests: `yarn test`
3. Observer the following error:

   ```
   ERROR Cannot establish one or more browser connections.
   ```

## Workaround

The following can be used to get around the error above:

1. Unplug TestCafe: `yarn unplug testcafe`
2. In the `.yarn\unplugged\testcafe-npm-<version>-<hash>\node_modules\testcafe\lib\utils\temp-directory\index.js` file (`<version>` and `<hash>` will be different per user), comment out the `await cleanup_process_1.default.init();` line as shown below:

   ```js
   async init() {
       await (0, make_dir_1.default)(TempDirectory.TEMP_DIRECTORIES_ROOT);
       const tmpDirNames = await this._getTmpDirsList(this.namePrefix);
       DEBUG_LOGGER('Found temp directories:', tmpDirNames);
       const existingTmpDirFound = await this._findFreeTmpDir(tmpDirNames);
       if (!existingTmpDirFound)
           await this._createNewTmpDir();
       DEBUG_LOGGER('Temp directory path: ', this.path);
       // await cleanup_process_1.default.init(); // <---- comment out this line
       await cleanup_process_1.default.addDirectory(this.path);
       USED_TEMP_DIRS[this.path] = this;
   }
   ```

3. Run `yarn test` again, and observe the browser connection error no longer happens, and TestCafe successfully executes test.
