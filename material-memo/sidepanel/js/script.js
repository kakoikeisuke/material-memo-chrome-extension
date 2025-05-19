initializeSettings()

function initializeSettings() {
    document.addEventListener('DOMContentLoaded', function() {
        chrome.storage.local.get('settings', function(result) {
            const localSettings = result.settings || [];
            if (localSettings.length === 0) {
                const defaultSettings = [
                    {
                        "keys": [
                            "base",
                            "base_color",
                            "diffuse_roughness",
                            "metalness",
                            "specular",
                            "specular_color",
                            "specular_roughness",
                            "specular_IOR",
                            "specular_anisotropy",
                            "specular_rotation",
                            "transmission",
                            "transmission_color",
                            "transmission_depth",
                            "transmission_scatter",
                            "transmission_scatter_anisotropy",
                            "transmission_dispersion",
                            "transmission_extra_roughness",
                            "subsurface",
                            "subsurface_color",
                            "subsurface_radius",
                            "subsurface_scale",
                            "subsurface_anisotropy",
                            "sheen",
                            "sheen_color",
                            "sheen_roughness",
                            "coat",
                            "coat_color",
                            "coat_roughness",
                            "coat_anisotropy",
                            "coat_rotation",
                            "coat_IOR",
                            "coat_normal",
                            "coat_affect_color",
                            "coat_affect_roughness",
                            "thin_film_thickness",
                            "thin_film_IOR",
                            "emission",
                            "emission_color",
                            "opacity",
                            "thin_walled",
                            "normal",
                            "tangent"
                        ],
                        "values": [
                            [false, "floatMin0Max1", 1],
                            [true, "x3FloatMin0Max1", [0.8, 0.8, 0.8]],
                            [false, "floatMin0Max1", 0],
                            [true, "floatMin0Max1", 0],
                            [false, "floatMin0Max1", 1],
                            [false, "x3FloatMin0Max1", [1, 1, 1]],
                            [true, "floatMin0Max1", 0.2],
                            [true, "floatMin1", 1.5],
                            [false, "floatMin0Max1", 0],
                            [false, "floatMin0Max1", 0],
                            [false, "floatMin0Max1", 0],
                            [false, "x3FloatMin0Max1", [1, 1, 1]],
                            [false, "floatMin0", 0],
                            [false, "x3FloatMin0Max1", [0, 0, 0]],
                            [false, "floatMin_1Max1", 0],
                            [false, "floatMin0", 0],
                            [false, "floatMin0Max1", 0],
                            [false, "floatMin0Max1", 0],
                            [false, "x3FloatMin0Max1", [1, 1, 1]],
                            [false, "x3FloatMin0Max1", [1, 1, 1]],
                            [false, "floatMin0", 1],
                            [false, "floatMin_1Max1", 0],
                            [false, "floatMin0Max1", 0],
                            [false, "x3FloatMin0Max1", [1, 1, 1]],
                            [false, "floatMin0Max1", 0.3],
                            [false, "floatMin0Max1", 0],
                            [false, "x3FloatMin0Max1", [1, 1, 1]],
                            [false, "floatMin0Max1", 0.1],
                            [false, "floatMin0Max1", 0],
                            [false, "floatMin0Max1", 0],
                            [false, "floatMin1", 1.5],
                            [false, "x3FloatMin_1Max1", [0, 0, 0]],
                            [false, "floatMin0Max1", 0],
                            [false, "floatMin0Max1", 0],
                            [false, "floatMin0", 0],
                            [false, "floatMin1", 1.5],
                            [false, "floatMin0", 0],
                            [false, "x3FloatMin0Max1", [1, 1, 1]],
                            [false, "x3FloatMin0Max1", [1, 1, 1]],
                            [false, "boolean", false],
                            [false, "x3FloatMin_1Max1", [0, 0, 0]],
                            [false, "x3FloatMin_1Max1", [0, 0, 0]]
                        ]
                    }
                ];
                chrome.storage.local.set({ 'settings': defaultSettings });
            }
            const main = checkMain();
            createNewMaterialSpace(main);
            showMaterial(main);
        })
    })
}

function checkMain() {
    const oldMain = document.getElementById('main');
    if (oldMain) {
        oldMain.remove();
    }
    const newMain = document.createElement('main');
    newMain.id = 'main';
    document.body.appendChild(newMain);
    return newMain;
}

function createNewMaterialSpace(main) {
    // 新規マテリアル：表示スペース
    const newMaterialDiv = document.createElement('div');
    newMaterialDiv.id = 'new-material-div';
    newMaterialDiv.classList.add('material-div');
    main.appendChild(newMaterialDiv);
    // 新規マテリアル：名前と設定のdiv
    const newMaterialNameAndSettingDiv = document.createElement('div');
    newMaterialNameAndSettingDiv.classList.add('new-material-name-and-setting-div');
    newMaterialDiv.appendChild(newMaterialNameAndSettingDiv);
    // 新規マテリアル：名前
    const newMaterialName = document.createElement('input');
    newMaterialName.id = 'new-material-name';
    newMaterialName.value = 'newMaterialName';
    newMaterialNameAndSettingDiv.appendChild(newMaterialName);
    // 新規マテリアル：設定
    const newMaterialSetting = document.createElement('div');
    newMaterialSetting.classList.add('new-material-setting');
    newMaterialNameAndSettingDiv.appendChild(newMaterialSetting);
    newMaterialSetting.addEventListener('click', () => {
        showSetting();
    })
    // 新規マテリアル：詳細
    createNewMaterialElement(newMaterialDiv);
}

function createNewMaterialElement(div) {
    chrome.storage.local.get('settings', function(result) {
        let keys = [];
        let values = [];
        result.settings.forEach(element => {
            keys = element.keys || [];
            values = element.values || [];
        });

        for (let i = 0; i < keys.length; i++) {
            if (values[i][0]) {
                // 表示スペース
                const newMaterialElementDiv = document.createElement('div');
                newMaterialElementDiv.classList.add('new-material-element-div');
                div.appendChild(newMaterialElementDiv);
                // 名前
                const newMaterialElementName = document.createElement('p');
                newMaterialElementName.innerText = keys[i];
                newMaterialElementName.classList.add('new-material-element-name');
                newMaterialElementDiv.appendChild(newMaterialElementName);
                // 値の入力スペース
                const newMaterialElementValueDiv = document.createElement('div');
                newMaterialElementValueDiv.classList.add('new-material-element-value-div');
                newMaterialElementDiv.appendChild(newMaterialElementValueDiv);
                // 値(値の入力スペース, 値の形式, 値そのもの, 項目名)
                createValueSpace(newMaterialElementValueDiv, values[i][1], values[i][2], keys[i]);
            }
        }

        // 保存ボタンのdiv
        const saveButtonDiv = document.createElement('div');
        saveButtonDiv.id = 'new-material-save-button-div';
        div.appendChild(saveButtonDiv);
        // 保存ボタン
        const saveButton = document.createElement('button');
        saveButton.innerText = chrome.i18n.getMessage('newMaterialCreateButton');
        saveButton.id = 'new-material-save-button';
        saveButtonDiv.appendChild(saveButton);
        saveButton.addEventListener('click', () => {
            const dataCheck = checkMaterial(keys, values);
            const exitErrorMessage = document.getElementsByClassName('error-message');
            if (exitErrorMessage) {
                Array.from(exitErrorMessage).forEach(message => {
                    message.remove();
                })
            }
            // エラーがあれば表示
            if (dataCheck[0]) {
                saveMaterial(keys, values);
            } else {
                const errorMessage = document.createElement('p');
                errorMessage.innerText = chrome.i18n.getMessage('saveMaterialError') + dataCheck[1];
                errorMessage.classList.add('error-message');
                div.appendChild(errorMessage);
            }
        })
    })
}

createValueSpace = (div, type, value, key) => {
    if (type === 'floatMin0Max1') {
        // スライダー
        const valueRange = document.createElement('input');
        valueRange.type = 'range';
        valueRange.min = '0';
        valueRange.max = '1';
        valueRange.step = '0.01';
        valueRange.value = String(value);
        valueRange.classList.add('input-range');
        div.appendChild(valueRange);
        // 入力
        const valueNumber = document.createElement('input');
        valueNumber.type = 'number';
        valueNumber.min = '0';
        valueNumber.max = '1';
        valueNumber.step = 'any';
        valueNumber.value = String(value);
        valueNumber.classList.add('input-number');
        valueNumber.id = key + '-value';
        div.appendChild(valueNumber);
        // 入力同期
        valueRange.addEventListener('input', () => {
            valueNumber.value = valueRange.value;
        })
        valueNumber.addEventListener('input', () => {
            valueRange.value = valueNumber.value;
        })
    } else if (type === 'x3FloatMin0Max1') {
        // 色の確認用
        const valueColor = document.createElement('div');
        valueColor.classList.add('input-color');
        div.appendChild(valueColor);
        // 色の値
        for (let i = 0; i < 3; i++) {
            const valueColorValue = document.createElement('input');
            valueColorValue.type = 'number';
            valueColorValue.min = '0';
            valueColorValue.max = '1';
            valueColorValue.step = 'any';
            valueColorValue.value = String(value[i]);
            valueColorValue.classList.add('input-number');
            valueColorValue.id = key + '-value-' + i;
            div.appendChild(valueColorValue);
            valueColorValue.addEventListener('input', () => {
                value[i] = valueColorValue.value;
                valueColor.style.backgroundColor = `rgb(${value[0] * 255}, ${value[1] * 255}, ${value[2] * 255})`;
            })
        }
        // 色の同期
        valueColor.style.backgroundColor = `rgb(${value[0] * 255}, ${value[1] * 255}, ${value[2] * 255})`;
    } else if (type === 'floatMin1') {
        // 入力
        const valueNumber = document.createElement('input');
        valueNumber.type = 'number';
        valueNumber.min = '1';
        valueNumber.step = 'any';
        valueNumber.value = String(value);
        valueNumber.classList.add('input-number');
        valueNumber.id = key + '-value';
        div.appendChild(valueNumber);
    } else if (type === 'floatMin0') {
        // 入力
        const valueNumber = document.createElement('input');
        valueNumber.type = 'number';
        valueNumber.min = '0';
        valueNumber.step = 'any';
        valueNumber.value = String(value);
        valueNumber.classList.add('input-number');
        valueNumber.id = key + '-value';
        div.appendChild(valueNumber);
    } else if (type === 'floatMin_1Max1') {
        // スライダー
        const valueRange = document.createElement('input');
        valueRange.type = 'range';
        valueRange.min = '-1';
        valueRange.max = '1';
        valueRange.step = '0.01';
        valueRange.value = String(value);
        valueRange.classList.add('input-range');
        div.appendChild(valueRange);
        // 入力
        const valueNumber = document.createElement('input');
        valueNumber.type = 'number';
        valueNumber.min = '-1';
        valueNumber.max = '1';
        valueNumber.step = 'any';
        valueNumber.value = String(value);
        valueNumber.classList.add('input-number');
        valueNumber.id = key + '-value';
        div.appendChild(valueNumber);
        // 入力同期
        valueRange.addEventListener('input', () => {
            valueNumber.value = valueRange.value;
        })
        valueNumber.addEventListener('input', () => {
            valueRange.value = valueNumber.value;
        })
    } else if (type === 'boolean') {
        // チェックボックス
        const valueCheckbox = document.createElement('input');
        valueCheckbox.type = 'checkbox';
        valueCheckbox.checked = value;
        valueCheckbox.classList.add('input-checkbox');
        valueCheckbox.id = key + '-value';
        div.appendChild(valueCheckbox);
        valueCheckbox.addEventListener('change', () => {
            value = valueCheckbox.checked;
        })
    } else if (type === 'x3FloatMin_1Max1') {
        // 入力
        // 色の値
        for (let i = 0; i < 3; i++) {
            const valueColorValue = document.createElement('input');
            valueColorValue.type = 'number';
            valueColorValue.min = '-1';
            valueColorValue.max = '1';
            valueColorValue.step = 'any';
            valueColorValue.value = String(value[i]);
            valueColorValue.classList.add('input-number');
            valueColorValue.id = key + '-value-' + i;
            div.appendChild(valueColorValue);
        }
    } else {
        const test = document.createElement('p');
        test.innerText = '正しく読み込まれませんでした。';
        div.appendChild(test);
    }
}

function checkMaterial(keys, values) {
    // チェック：マテリアル
    const materialName = document.getElementById('new-material-name').value;
    const nameRegex = /^[a-zA-Z0-9_]+$/;
    if (!nameRegex.test(materialName)) {
        return [false, 'Material Name'];
    }
    // チェック：各パラメータ
    for (let i = 0; i < keys.length; i++) {
        if (values[i][0]) {
            const key = keys[i];
            switch (values[i][1]) {
                case 'floatMin0Max1':
                    try {
                        const floatMin0Max1 = document.getElementById(key + '-value').value;
                        if (floatMin0Max1 < 0 || floatMin0Max1 > 1) {
                            return [false, key];
                        }
                    } catch (error) {
                        return [false, key];
                    }
                    break;
                case 'x3FloatMin0Max1':
                    try {
                        for (let j = 0; j < 3; j++) {
                            const v = document.getElementById(key + '-value-' + j).value;
                            if (v < 0 || v > 1) {
                                return [false, key];
                            }
                        }
                    } catch (error) {
                        return [false, key];
                    }
                    break;
                case 'floatMin1':
                    try {
                        const floatMin1 = document.getElementById(key + '-value').value;
                        if (floatMin1 < 1) {
                            return [false, key];
                        }
                    } catch (error) {
                        return [false, key];
                    }
                    break;
                case 'floatMin0':
                    try {
                        const floatMin0 = document.getElementById(key + '-value').value;
                        if (floatMin0 < 0) {
                            return [false, key];
                        }
                    } catch (error) {
                        return [false, key];
                    }
                    break;
                case 'floatMin_1Max1':
                    try {
                        const floatMin_1Max1 = document.getElementById(key + '-value').value;
                        if (floatMin_1Max1 < -1 || floatMin_1Max1 > 1) {
                            return [false, key];
                        }
                    } catch (error) {
                        return [false, key];
                    }
                    break;
                case 'boolean':
                    break;
                case 'x3FloatMin_1Max1':
                    try {
                        for (let j = 0; j < 3; j++) {
                            const v = document.getElementById(key + '-value-' + j).value;
                            if (v < -1 || v > 1) {
                                return [false, key];
                            }
                        }
                    } catch (error) {
                        return [false, key];
                    }
                    break;
                default:
                    break;
            }
        }
    }
    return [true];
}

function saveMaterial(keys, values) {
    const newMaterial = {};
    newMaterial.id = createId();
    newMaterial.name = document.getElementById('new-material-name').value;

    // 配列構造にしたため、各項目の処理方法を変更
    for (let i = 0; i < keys.length; i++) {
        if (values[i][0]) {
            const key = keys[i];
            switch (values[i][1]) {
                case 'floatMin0Max1':
                case 'floatMin1':
                case 'floatMin0':
                case 'floatMin_1Max1':
                    newMaterial[key] = document.getElementById(key + '-value').value;
                    break;
                case 'x3FloatMin0Max1':
                case 'x3FloatMin_1Max1':
                    let color = []
                    for (let j = 0; j < 3; j++) {
                        color.push(document.getElementById(key + '-value-' + j).value);
                    }
                    newMaterial[key] = color;
                    break;
                case 'boolean':
                    newMaterial[key] = document.getElementById(key + '-value').checked;
            }
        }
    }

    // storage.local に新規マテリアルを追加
    chrome.storage.local.get('materials', function(result) {
        const materials = result.materials || [];
        materials.push(newMaterial);
        chrome.storage.local.set({ 'materials': materials }, function() {
            const main = checkMain();
            createNewMaterialSpace(main);
            showMaterial(main);
        });
    });
}

function createId() {
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}`;
}

function showMaterial(main) {
    // ここにマテリアルを読み取る機能を記述
    chrome.storage.local.get('materials', function(result) {
        const materials = result.materials || [];
        const materialData = Object.values(materials).reverse();
        materialData.forEach(material => {
            // マテリアル表示div
            const materialDiv = document.createElement('div');
            materialDiv.classList.add('material-div')
            main.appendChild(materialDiv);

            // マテリアル名と操作アイコン表示のdiv
            const materialNameAndIonDiv = document.createElement('div');
            materialNameAndIonDiv.classList.add('material-name-and-ion-div');
            materialDiv.appendChild(materialNameAndIonDiv);

            // マテリアル名
            const name = document.createElement('p');
            name.innerText = material.name;
            name.classList.add('material-name');
            materialNameAndIonDiv.appendChild(name);

            // 操作アイコンdiv
            const materialIconDiv = document.createElement('div');
            materialIconDiv.classList.add('material-icon-div');
            materialNameAndIonDiv.appendChild(materialIconDiv);

            // 削除
            const deleteIcon = document.createElement('div');
            deleteIcon.classList.add('delete-icon', 'action-icon-div');
            deleteIcon.addEventListener('click', () => {
                materialDiv.remove()
                deleteMaterial(material.id);
            })
            materialIconDiv.appendChild(deleteIcon);

            // ダウンロード
            const downloadIcon = document.createElement('div');
            downloadIcon.classList.add('download-icon', 'action-icon-div');
            downloadIcon.addEventListener('click', () => {
                downloadMaterial(material.id);
            })
            materialIconDiv.appendChild(downloadIcon);

            // 折りたたみ用div
            const materialCollapseDiv = document.createElement('div');
            materialCollapseDiv.classList.add('material-collapse-div');
            materialDiv.appendChild(materialCollapseDiv);
            materialCollapseDiv.style.display = 'none';

            // 折りたたみ
            const collapseIcon = document.createElement('div');
            collapseIcon.classList.add('collapse-icon', 'action-icon-div');
            collapseIcon.addEventListener('click', () => {
                if (materialCollapseDiv.style.display === 'none') {
                    materialCollapseDiv.style.display = 'block';
                } else {
                    materialCollapseDiv.style.display = 'none';
                }
            })
            materialIconDiv.appendChild(collapseIcon);
            name.addEventListener('click', () => {
                if (materialCollapseDiv.style.display === 'none') {
                    materialCollapseDiv.style.display = 'block';
                } else {
                    materialCollapseDiv.style.display = 'none';
                }
            })
            // その他の属性を項目名：値の形式で表示（idは除外）
            for (const key in material) {
                // idとname以外を表示
                if (key !== 'id' && key !== 'name') {
                    const elementDiv = document.createElement('div');
                    elementDiv.classList.add('material-element-div');
                    materialCollapseDiv.appendChild(elementDiv);
                    // 項目名
                    const elementName = document.createElement('p');
                    elementName.innerText = key;
                    elementName.classList.add('material-element-name');
                    elementDiv.appendChild(elementName);
                    // 値
                    const elementValue = document.createElement('p');
                    if (Array.isArray(material[key])) {
                        // 配列なら連結
                        elementValue.innerText = material[key].join(', ');
                    } else if (typeof material[key] === 'boolean') {
                        // ブール値ならON, OFF
                        if (material[key]) {
                            elementValue.innerText = 'on';
                        } else {
                            elementValue.innerText = 'off';
                        }
                    } else {
                        // 値はそのまま
                        elementValue.innerText = material[key];
                    }
                    elementValue.classList.add('material-element-value');
                    elementDiv.appendChild(elementValue);
                }
            }
        })
    })
}

function deleteMaterial(id) {
    chrome.storage.local.get('materials', function(result) {
        const materials = result.materials || [];
        const updatedMaterials = materials.filter(material => material.id !== id);
        chrome.storage.local.set({ 'materials': updatedMaterials });
    });
}
function downloadMaterial(id) {
    chrome.storage.local.get('materials', function(result) {
        const materials = result.materials || [];
        const material = materials.find(m => m.id === id);
        let mtlxContent = '<?xml version="1.0"?>\n<materialx version="1.38">\n';

        mtlxContent += `  <standard_surface name="SR_${material.name}" type="surfaceshader">\n`;

        // 各パラメータを追加
        for (const key in material) {
            if (key !== 'id' && key !== 'name') {
                let value;

                if (Array.isArray(material[key])) {
                    // 配列値の場合（color3, vector3）
                    value = material[key].join(', ');
                } else if (typeof material[key] === 'boolean') {
                    // ブール値の場合
                    value = material[key].toString();
                } else {
                    // その他の値
                    value = material[key];
                }

                // 値の型を判断
                let type;
                if (Array.isArray(material[key]) && material[key].length === 3) {
                    // vector3とcolor3の区別
                    if (key === 'normal' || key === 'tangent' || key === 'coat_normal' ||
                        key.includes('_normal') || key.includes('_tangent')) {
                        type = 'vector3';
                    } else {
                        type = 'color3';
                    }
                } else if (typeof material[key] === 'boolean') {
                    type = 'boolean';
                } else {
                    type = 'float';
                }

                mtlxContent += `    <input name="${key}" type="${type}" value="${value}" />\n`;
            }
        }

        mtlxContent += '  </standard_surface>\n';

        mtlxContent += `  <surfacematerial name="${material.name}" type="material">\n`;
        mtlxContent += `    <input name="surfaceshader" type="surfaceshader" nodename="SR_${material.name}" />\n`;
        mtlxContent += '  </surfacematerial>\n';
        mtlxContent += '</materialx>';

        // ダウンロード
        const blob = new Blob([mtlxContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${material.name}.mtlx`;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    });
}

function showSetting() {
    const main = checkMain();
    const settingDiv = document.createElement('div');
    settingDiv.id = 'setting-div';
    main.appendChild(settingDiv);
    // 戻るボタン
    const back = document.createElement('div');
    back.id = 'setting-back-icon';
    settingDiv.appendChild(back);
    back.addEventListener('click', () => {
        const nextMain = checkMain();
        createNewMaterialSpace(nextMain);
        showMaterial(nextMain);
    })
    // 設定の説明
    const settingMessage = document.createElement('p');
    settingMessage.id = 'setting-message';
    settingMessage.innerText = chrome.i18n.getMessage('settingMessage');
    settingDiv.appendChild(settingMessage);
    // 項目表示用div
    const elementAllDiv = document.createElement('div');
    elementAllDiv.id = 'setting-element-all-div';
    settingDiv.appendChild(elementAllDiv);
    // 各項目ごと
    chrome.storage.local.get('settings', function(result) {
        let keys = [];
        let values = [];
        result.settings.forEach(element => {
            keys = element.keys || [];
            values = element.values || [];
        });

        for (let i = 0; i < keys.length; i++) {
            // div
            const elementDiv = document.createElement('div');
            elementDiv.classList.add('setting-element-div');
            elementAllDiv.appendChild(elementDiv);
            // key
            const elementKey = document.createElement('p');
            elementKey.innerText = keys[i];
            elementKey.classList.add('setting-element-key');
            elementDiv.appendChild(elementKey);
            // value(true or false)
            const elementCheckbox = document.createElement('input');
            elementCheckbox.type = 'checkbox';
            elementCheckbox.checked = values[i][0];
            elementCheckbox.classList.add('setting-element-checkbox');
            elementDiv.appendChild(elementCheckbox);
            elementCheckbox.addEventListener('change', () => {
                changeMaterialSetting(i, elementCheckbox.checked);
            })
        }
    })
}

function changeMaterialSetting(index, value) {
    chrome.storage.local.get('settings', function(result) {
        const settings = result.settings || [];
        if (settings.length > 0 && settings[0].values && settings[0].values.length > index) {
            settings[0].values[index][0] = value;
            // 更新した設定を保存
            chrome.storage.local.set({ 'settings': settings });
        }
    })
}