## How it works
Combine static html files with common component such as header and footer using mustache.js.
1. The program read all component files from component_folder
2. If any component file ended with .json, it will be parsed as json.
3. It render all components into template and write out to output folder.
4. The written output folder will preserve the same directory structure as the original.
5. It uses $$var$$ directive instead of {{var}} and {{{var}}}

## Install
npm install --dev heartnetkung/mustache_static_render

## Usage
```
mustache_static_render [template_folder] [component_folder] [output_folder]
```

## Example
See in test directory

0. The command is 
```
mustache_static_render test/test_input test/test_data test/test_output
```
1. template: test/test_input/a/page.html
```
$$#abc$$
	hello $$foo$$
$$/abc$$
$$d/ef/g$$
```
2. component1: test/test_data/abc.json
```json
{
	"foo":"<h1>bar</h1>"
}
```
3. component2: test/test_data/d/ef/g
```
hello
```
4. output: test/test_output/a/page.html
```
	hello <h1>bar</h1>
hello
```
