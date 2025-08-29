import JSEncrypt from 'jsencrypt';

// 密钥对生成 http://web.chacuo.net/netrsakeypair
const publicKey = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKzbdDZuZ7sdNx6tK2zVYw7NVaz+5X4b
yWpxf6D/IHjQzwkVmLkgdbVkiC0NC8CH+b3b9srjWxxbRNTNsbLr8ZkCAwEAAQ==`;

const privateKey = `MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEArNt0Nm5nux03Hq0r
bNVjDs1VrP7lfhvJanF/oP8geNDPCRWYuSB1tWSILQ0LwIf5vdv2yuNbHFtE1M2x
suvxmQIDAQABAkEAo+nOP7deAh9oH1zS6vdGYcjwz4U+leE/lAJgpoiHgEfhyYEe
naL55Bk8vtEYOk5kVq48i5laejhjt+OoEkeZAQIhAOEvDPsVSeZnHNY08IVJFYV6
8HnzTxM7KuCsdvfwZYaJAiEAxIM6NCx6YRtvQxOYpQjVDUP0oKXkav6dLMBcdbvF
TpECIQDFVc4yWr2gQ8xpi4sbwqgxiUMkG6y4VamFqp23Odw+wQIgPv1NV9H1/FB9
7oNGh4f4OsNQk3n5aK5qlSCnwnlIunECIQDJ4zeEiilbAcxflKnqkY2H1qiH5CgM
ZH2AMfdkgB5KdQ==`;

/**
 * 使用公钥加密文本
 * @param txt 要加密的文本
 * @returns 加密后的文本
 */
export function encrypt(txt: string): string | false {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey); // 设置公钥
  return encryptor.encrypt(txt); // 对数据进行加密
}

/**
 * 使用私钥解密密文
 * @param txt 要解密的密文
 * @returns 解密后的文本
 */
export function decrypt(txt: string): string | false {
  const encryptor = new JSEncrypt();
  encryptor.setPrivateKey(privateKey); // 设置私钥
  return encryptor.decrypt(txt); // 对数据进行解密
}
