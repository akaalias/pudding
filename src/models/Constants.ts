export default class Constants {
    public static maxDepth = 4

    public static offsetForDepth(depth: number) {
        if(depth >= 3) {
            return 50
        }
        if(depth == 2) {
            return 12
        }
        if(depth == 1) {
            return 12
        }

        return 10
    }
}