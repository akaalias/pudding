export default class Constants {
    public static maxDepth = 3

    public static offsetForDepth(depth: number) {

        if(depth >= 3) {
            return 80
        }
        if(depth == 2) {
            return 40
        }
        if(depth == 1) {
            return 10
        }

        return 1
    }
}