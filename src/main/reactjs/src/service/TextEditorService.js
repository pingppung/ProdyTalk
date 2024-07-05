import axios from 'axios';

class TextEditorService {

    changeText(delta){
        return axios.post('/api/texteditor/change', {params: { text : delta, }});
    }
}

export default new TextEditorService();