import React, { useEffect } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = () => {
	useEffect(() => {
		async function init() {
			Codemirror.fromTextArea(document.getElementById('codesync'), {
				mode: { name: 'javascript', json: 'true' },
				theme: 'panda-syntax',
				autoCloseTags: true,
				autoCloseBrackets:true,
				lineNumbers: true,
			});
		}
		init();
	}, []);
	return <textarea id='codesync'></textarea>;
};

export default Editor;
