import XMLParser from 'fast-xml-parser';

const xmlConfig = {
    // XML 转 JSON 配置
    trimValues: true,
    textNodeName: 'text',
    ignoreAttributes: false,
    attributeNamePrefix: '',
    parseAttributeValue: true
};

export default function(xmlData: string) {
    return XMLParser.parse(xmlData, xmlConfig);
}
