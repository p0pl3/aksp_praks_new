import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.Scanner;

public class Client {
    private Client() {
    }

    public static void main(String[] args) {
        try {
            Registry registry = LocateRegistry.getRegistry(null);
            EquationsSolver stub = (EquationsSolver) registry.lookup("EquationsSolver");
            double a, b, c;
            Scanner scanner = new Scanner(System.in);
            System.out.print("Input a: ");
            a = scanner.nextDouble();
            System.out.print("Input b: ");
            b = scanner.nextDouble();
            System.out.print("Input c: ");
            c = scanner.nextDouble();
            System.out.printf("%s x^2 + %s x + %s = 0%n", a, b, c);
            Answer answer = (Answer) stub.solve(a, b, c);
            System.out.println(answer.getAnswer());
        } catch (Exception e) {
            System.err.println("Client exception: " + e.toString());
            e.printStackTrace();
        }
    }
}
