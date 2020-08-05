import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;

public class Complete {

	static CountDownLatch countDownLatch = new CountDownLatch(10);

	public static void main(String[] args) throws Exception {
		Bill bill = new Bill();
		System.out.println("计数器初始值: " + countDownLatch.getCount());
		int loopCount = 10;
		for (int i = 0; i < loopCount; i++) {
			new Thread(bill, String.valueOf(i + 1)).start();
		}
		Thread.sleep((loopCount + 1) * 500);
		System.out.println("计数器最终值: " + countDownLatch.getCount());
		countDownLatch.await();
		System.out.println("Main线程: " + bill.getNum());
	}
}

class Bill implements Runnable {
	AtomicInteger count = new AtomicInteger(0);

	public void run() {
		long time = Long.parseLong(Thread.currentThread().getName());
		try {
			Thread.sleep(time * 500);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		for (int i = 0; i < 10; i++) {
			count.incrementAndGet();
		}

		System.out.println("线程" + Thread.currentThread().getName() + "当前数值: " + count);

		Complete.countDownLatch.countDown();
		System.out.println("第" + Thread.currentThread().getName() + "次循环计数器值: " + Complete.countDownLatch.getCount());
	}

	public String getNum() {
		return Thread.currentThread().getName() + "当前数值: " + count;
	}

}
