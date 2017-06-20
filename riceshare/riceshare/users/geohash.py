class StaticVariable:
	BASE_32 = "0123456789bcdefghjkmnpqrstuvwxyz"
	PRECISION = 12

class GeoHash(object):
	"""docstring for GeoHash"""
	def __init__(self):
		pass

	def getBinary(self,target,begin,end):
		sb = ""
		mid = 0.0
		for x in range(0,int(StaticVariable.PRECISION * 5 / 2)):
			mid = (begin + end) / 2.0
			if mid < target:
				sb += "1"
				begin = mid
			else:
				sb += "0"
				end = mid
		return sb

	def encode(self, latitude, longtitude, precision):
	    latitudeInBinary = self.getBinary(latitude, -90.0, 90.0)
	    longtitudeInBinary = self.getBinary(longtitude, -180.0, 180.0)
	    mergedBinary = ""
	    for i in range(0,len(longtitudeInBinary)):
		    mergedBinary = mergedBinary + longtitudeInBinary[i] + latitudeInBinary[i]

	    sb = ""
	    count = 0
	    while (count < precision):
		    item = mergedBinary[count * 5 : (count + 1) * 5]
		    sb += StaticVariable.BASE_32[int(item, 2)]
		    count += 1
	    return sb


