#include <iostream>
#include <chrono>
#include<time.h>
using namespace std::chrono;
using namespace std;
// https://learntechway.com/simple-timer-in-c-using-chrono-library/
// https://www.quora.com/How-would-I-calculate-the-number-of-cycles-in-a-C-C++-program-How-would-I-calculate-the-time-taken-by-the-program-in-nanoseconds

void systemclock(){
	clock_t start_t, end_t, total_t;
	system_clock::time_point a = system_clock::now();
	start_t = clock();	
	cout << "Hello, World" << endl;
	system_clock::time_point b = system_clock::now();
	end_t = clock();
	duration<double> time_span = duration_cast<duration<double> >(b-a);
	cout << "It took " << time_span.count() << " seconds using the system clock." << endl;
	cout << "There were " << end_t-start_t << " clock cycles.\n" << endl;
}
void steadyclock(){
	clock_t start_t, end_t, total_t;
	steady_clock::time_point a = steady_clock::now();
	start_t = clock();	
	cout << "Hello, World" << endl;
	steady_clock::time_point b = steady_clock::now();
	end_t = clock();
	duration<double> time_span = duration_cast<duration<double> >(b-a);
	cout << "It took " << time_span.count() << " seconds using the steady clock." << endl;
	cout << "There were " << end_t-start_t << " clock cycles.\n" << endl;
}
void highresolutionclock(){
	clock_t start_t, end_t, total_t;
	high_resolution_clock::time_point a = high_resolution_clock::now();
	start_t = clock();	
	cout << "Hello, World" << endl;
	high_resolution_clock::time_point b = high_resolution_clock::now();
	end_t = clock();
	duration<double> time_span = duration_cast<duration<double> >(b-a);
	cout << "It took " << time_span.count() << " seconds using the high resolution clock." << endl;
	cout << "There were " << end_t-start_t << " clock cycles.\n" << endl;
}

int main(int argc, char ** argv){
	systemclock();
	steadyclock();
	highresolutionclock();
}
