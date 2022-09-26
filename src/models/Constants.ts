export default class Constants {
    public static maxDepth = 2

    public static offsetForDepth(depth: number) {
        if(depth >= 3) {
            return 50
        }
        if(depth == 2) {
            return 25
        }
        if(depth == 1) {
            return 12
        }

        return 1
    }
}