import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;

public class LinShi {

	static AtomicInteger atomicInteger = new AtomicInteger(0);
	static CountDownLatch ct = new CountDownLatch(100);

	public static void main(String[] args) throws Exception {

		for (int i = 0; i < 100; i++) {
			new Thread(() -> {
				add();
				ct.countDown();
			}).start();
		}
		ct.await();
		System.out.println("线程执行完" + LinShi.atomicInteger.toString());
	}

	public static void add() {
//		try {
//			Thread.sleep(1000);
//		} catch (InterruptedException e) {
//			e.printStackTrace();
//		}
		for (int i = 0; i < 100; i++) {
			atomicInteger.incrementAndGet();
			System.out.println(atomicInteger.toString());

		}

	}

}
