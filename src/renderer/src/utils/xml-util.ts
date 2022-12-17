import { X2jOptionsOptional, XMLParser } from 'fast-xml-parser'

const parserConfig: X2jOptionsOptional = {
  // XML 转 JSON 配置
  trimValues: true,
  textNodeName: 'text',
  ignoreAttributes: false,
  attributeNamePrefix: '',
  parseAttributeValue: true
}

const parser = new XMLParser(parserConfig)

export default function parseXML(xmlData: string): unknown {
  return parser.parse(xmlData)
}
