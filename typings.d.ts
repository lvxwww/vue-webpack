declare module '*.css'
declare module '*.less'
declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.js'
declare module '*.ts'
declare module '*.svg' {
    const content: any
    export default content
}
